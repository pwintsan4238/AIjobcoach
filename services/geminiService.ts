
import { GoogleGenAI, Modality, LiveServerMessage, Blob } from '@google/genai';
import { encode, decode, decodeAudioData } from './audioUtils.ts';
import { MODEL_NAME, VOICE_NAME, SYSTEM_INSTRUCTION, ENGLISH_MODE_INSTRUCTION, ANSWER_SILENCE_MS } from '../constants.ts';
import { InterviewLanguage } from '../types.ts';
import { auth } from './firebase.ts';

const TOKEN_URL = import.meta.env.VITE_TOKEN_URL as string | undefined;

const MYANMAR_SCRIPT = /[က-႟]/;
const TARGET_INPUT_RATE = 16000;

/** Resamples mic audio to the 16 kHz Gemini expects, averaging each step as a simple low-pass. */
function downsampleTo16k(input: Float32Array, inputRate: number): Float32Array {
  if (inputRate === TARGET_INPUT_RATE) return input;
  const ratio = inputRate / TARGET_INPUT_RATE;
  const output = new Float32Array(Math.floor(input.length / ratio));
  for (let i = 0; i < output.length; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.min(input.length, Math.floor((i + 1) * ratio));
    let sum = 0;
    for (let j = start; j < end; j++) sum += input[j];
    output[i] = sum / Math.max(1, end - start);
  }
  return output;
}

/**
 * Builds a Gemini client. In production the browser gets a short-lived
 * token from the token Worker, so the real API key is never shipped.
 * A raw key is only used for local development.
 */
async function createClient(): Promise<GoogleGenAI> {
  if (TOKEN_URL) {
    // Signed-in users are counted by account; guests (no Firebase user) by IP
    const idToken = await auth.currentUser?.getIdToken().catch(() => null);
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: idToken ? { Authorization: `Bearer ${idToken}` } : undefined,
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body.token) {
      throw new Error(body.error || "ဆာဗာမှ ခွင့်ပြုချက် မရရှိပါ။ ခဏနေမှ ပြန်ကြိုးစားပါ။ (Could not get a session token)");
    }
    return new GoogleGenAI({ apiKey: body.token, httpOptions: { apiVersion: 'v1alpha' } });
  }

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'undefined' || apiKey === 'PLACEHOLDER_API_KEY') {
    throw new Error("API Key is missing. Set VITE_TOKEN_URL, or GEMINI_API_KEY for local development.");
  }
  return new GoogleGenAI({ apiKey });
}

export class InterviewSession {
  private session: any = null;
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private sources: Set<AudioBufferSourceNode> = new Set();
  private nextStartTime: number = 0;
  private stream: MediaStream | null = null;

  constructor() {}

  /**
   * Starts a new Live API session with audio streaming.
   */
  async start(
    callbacks: {
      onTranscription: (text: string, isUser: boolean) => void;
      onTurnComplete: () => void;
      onError: (err: any) => void;
      onClose: () => void;
      onSpeaking: (isSpeaking: boolean) => void;
    },
    targetRole?: string,
    openingQuestion?: string,
    language: InterviewLanguage = 'my'
  ) {
    try {
      const english = language === 'en';
      const roleFocus = targetRole
        ? `\n\nCURRENT TARGET ROLE FOCUS:\nThe candidate wants to practice specifically for the role of "${targetRole}". Warmly welcome them in ${english ? 'English' : 'Myanmar language'} for the ${targetRole} interview, and ask realistic, practical interview questions specifically relevant to a ${targetRole} job${english ? '' : ' in Myanmar'}.`
        : '';
      const systemInstruction = SYSTEM_INSTRUCTION + (english ? ENGLISH_MODE_INSTRUCTION : '') + roleFocus;

      // Audio contexts are created before any await so they count as part of
      // the user's click; otherwise mobile browsers keep them suspended (silent).
      // The mic runs at the device's own rate and is resampled to 16 kHz below,
      // because some browsers ignore or reject a requested 16 kHz rate.
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.inputAudioContext = new AudioCtx();
      this.outputAudioContext = new AudioCtx({ sampleRate: 24000 });
      this.inputAudioContext.resume().catch(() => {});
      this.outputAudioContext.resume().catch(() => {});

      // Echo cancellation keeps Thandar's voice from the speakers out of the candidate's answer
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });

      const ai = await createClient();

      // Connect to Gemini Live API
      const sessionPromise = ai.live.connect({
        model: MODEL_NAME,
        callbacks: {
          onopen: () => {
            console.log("Live connection opened.");
            if (!this.stream || !this.inputAudioContext) return;
            
            const source = this.inputAudioContext.createMediaStreamSource(this.stream);
            const scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

            const inputRate = this.inputAudioContext.sampleRate;
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = downsampleTo16k(e.inputBuffer.getChannelData(0), inputRate);
              const pcmBlob = this.createBlob(inputData);
              
              // CRITICAL: Solely rely on sessionPromise resolves and then call `session.sendRealtimeInput`, 
              // **do not** add other condition checks to avoid race conditions.
              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  audio: {
                    data: pcmBlob.data,
                    mimeType: pcmBlob.mimeType
                  }
                });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(this.inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle transcriptions; one message can carry both the candidate's and Thandar's
            const inputText = message.serverContent?.inputTranscription?.text;
            if (inputText) callbacks.onTranscription(inputText, true);
            const outputText = message.serverContent?.outputTranscription?.text;
            if (outputText) callbacks.onTranscription(outputText, false);

            if (message.serverContent?.turnComplete) {
              callbacks.onTurnComplete();
            }

            // Handle model audio output bytes
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && this.outputAudioContext) {
              callbacks.onSpeaking(true);
              this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
              
              try {
                // Decode raw PCM bytes using custom manual decoding utility
                const buffer = await decodeAudioData(decode(base64Audio), this.outputAudioContext, 24000, 1);
                const source = this.outputAudioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(this.outputAudioContext.destination);
                
                source.addEventListener('ended', () => {
                  this.sources.delete(source);
                  if (this.sources.size === 0) {
                    callbacks.onSpeaking(false);
                  }
                });

                // Precise scheduling for gapless playback using track end cursor
                source.start(this.nextStartTime);
                this.nextStartTime += buffer.duration;
                this.sources.add(source);
              } catch (decodeErr) {
                console.warn("Audio decode failed:", decodeErr);
              }
            }

            // Handle interruption (stop current playback queue)
            if (message.serverContent?.interrupted) {
              for (const source of this.sources.values()) {
                try { source.stop(); } catch(e) {}
              }
              this.sources.clear();
              this.nextStartTime = 0;
              callbacks.onSpeaking(false);
            }
          },
          onerror: (e: any) => {
            console.error("Live session error:", e);
            callbacks.onError(e);
          },
          onclose: () => {
            console.log("Live session closed.");
            callbacks.onClose();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          // Hint that answers are in Myanmar (with English terms), or English in English mode
          inputAudioTranscription: { languageCodes: english ? ['en-US', 'my-MM'] : ['my-MM', 'en-US'] },
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } },
          },
          systemInstruction,
          // Pauses while thinking don't cut the candidate off; ~10 s of silence ends the answer
          realtimeInputConfig: {
            automaticActivityDetection: { silenceDurationMs: ANSWER_SILENCE_MS },
          },
        },
      });

      this.session = await sessionPromise;

      // Make the coach open with the exact question shown on screen
      if (openingQuestion) {
        const howToSay = english && MYANMAR_SCRIPT.test(openingQuestion)
          ? 'translate it naturally into English and ask it in English'
          : `say it in ${english ? 'English' : 'Myanmar'}, word for word`;
        this.sendText(`Start the interview now. Your first question must be exactly this (${howToSay}): "${openingQuestion}"`);
      }
    } catch (err: any) {
      this.stop();
      throw err;
    }
  }

  /**
   * Sends a text instruction to the coach during an active session.
   */
  sendText(text: string) {
    if (!this.session) return;
    // Stop whatever Thandar is still saying so the new question doesn't play over it
    this.stopPlayback();
    this.session.sendClientContent({
      turns: [{ role: 'user', parts: [{ text }] }],
      turnComplete: true,
    });
  }

  /** Stops Thandar's queued audio immediately. */
  private stopPlayback() {
    for (const source of this.sources.values()) {
      try { source.stop(); } catch(e) {}
    }
    this.sources.clear();
    this.nextStartTime = 0;
  }

  /**
   * Helper to convert Float32 audio samples to 16-bit PCM Blob for Gemini.
   */
  private createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      // Clip first: a full-scale sample would otherwise wrap around and crackle
      const s = Math.max(-1, Math.min(1, data[i]));
      int16[i] = s < 0 ? s * 32768 : s * 32767;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  /**
   * Closes resources and terminates active session.
   */
  stop() {
    for (const source of this.sources.values()) {
      try { source.stop(); } catch(e) {}
    }
    this.sources.clear();
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.inputAudioContext) {
      this.inputAudioContext.close().catch(() => {});
      this.inputAudioContext = null;
    }
    if (this.outputAudioContext) {
      this.outputAudioContext.close().catch(() => {});
      this.outputAudioContext = null;
    }
    if (this.session) {
      try { this.session.close(); } catch(e) {}
      this.session = null;
    }
  }
}
