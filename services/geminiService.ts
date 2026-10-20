
import { GoogleGenAI, Modality, LiveServerMessage, Blob } from '@google/genai';
import { encode, decode, decodeAudioData } from './audioUtils.ts';
import { MODEL_NAME, VOICE_NAME, SYSTEM_INSTRUCTION } from '../constants.ts';

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
    targetRole?: string
  ) {
    try {
      // Use API Key from environment
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'undefined' || apiKey === 'PLACEHOLDER_API_KEY') {
        throw new Error("API Key is missing. Please ensure GEMINI_API_KEY is configured in your environment.");
      }

      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      // Request microphone access
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize Google GenAI client
      const ai = new GoogleGenAI({ apiKey });

      // Connect to Gemini Live API
      const sessionPromise = ai.live.connect({
        model: MODEL_NAME,
        callbacks: {
          onopen: () => {
            console.log("Live connection opened.");
            if (!this.stream || !this.inputAudioContext) return;
            
            const source = this.inputAudioContext.createMediaStreamSource(this.stream);
            const scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
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
            // Handle transcriptions (both input and output)
            if (message.serverContent?.outputTranscription) {
              callbacks.onTranscription(message.serverContent.outputTranscription.text, false);
            } else if (message.serverContent?.inputTranscription) {
              callbacks.onTranscription(message.serverContent.inputTranscription.text, true);
            }

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
          inputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } },
          },
          systemInstruction: targetRole 
            ? `${SYSTEM_INSTRUCTION}\n\nCURRENT TARGET ROLE FOCUS:\nThe candidate wants to practice specifically for the role of "${targetRole}". Warmly welcome them in Myanmar language for the ${targetRole} interview, and ask realistic, practical interview questions specifically relevant to a ${targetRole} job in Myanmar.`
            : SYSTEM_INSTRUCTION,
        },
      });

      this.session = await sessionPromise;
    } catch (err: any) {
      this.stop();
      throw err;
    }
  }

  /**
   * Helper to convert Float32 audio samples to 16-bit PCM Blob for Gemini.
   */
  private createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      // Scale and clip to Int16 range (32768)
      int16[i] = data[i] * 32768;
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
