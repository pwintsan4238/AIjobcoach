import React, { useState, useEffect, useRef } from 'react';

interface QuestionPopupProps {
  questionText: string;
  roleName: string;
  roleIcon: string;
  questionIndex: number;
  isCoachSpeaking: boolean;
  candidateLiveAnswer?: string;
  onClose?: () => void;
  onRepeatQuestion?: () => void;
  onNextQuestionPrompt?: () => void;
}

/**
 * Tokenizes text for smooth word-by-word display,
 * respecting Myanmar syllables and English words.
 */
function tokenizeWords(text: string): string[] {
  if (!text) return [];
  // Match English words, spaces, or Myanmar phrases
  const tokens: string[] = [];
  const parts = text.split(/(\s+|[၊။?!])/);
  
  for (const part of parts) {
    if (!part) continue;
    if (part.length > 7 && !part.includes(' ')) {
      // Break longer continuous Myanmar script phrases into 4-6 character tokens
      const subChunks = part.match(/.{1,5}/g) || [part];
      tokens.push(...subChunks);
    } else {
      tokens.push(part);
    }
  }
  return tokens;
}

export const QuestionPopup: React.FC<QuestionPopupProps> = ({
  questionText,
  roleName,
  roleIcon,
  questionIndex,
  isCoachSpeaking,
  candidateLiveAnswer,
  onClose,
  onRepeatQuestion,
  onNextQuestionPrompt,
}) => {
  const [tokens, setTokens] = useState<string[]>([]);
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasFinishedRevealing, setHasFinishedRevealing] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // When questionText changes, reset and start word-by-word reveal
  useEffect(() => {
    if (!questionText) return;
    const words = tokenizeWords(questionText);
    setTokens(words);
    setRevealedCount(0);
    setHasFinishedRevealing(false);

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    let current = 0;
    // Word reveal interval: ~85ms per token for natural speech sync
    timerRef.current = window.setInterval(() => {
      current++;
      setRevealedCount(current);
      if (current >= words.length) {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setHasFinishedRevealing(true);
      }
    }, 85);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [questionText]);

  // If coach stops speaking, fast-forward all words so candidate sees entire question
  useEffect(() => {
    if (!isCoachSpeaking && tokens.length > 0 && !hasFinishedRevealing) {
      setRevealedCount(tokens.length);
      setHasFinishedRevealing(true);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isCoachSpeaking, tokens, hasFinishedRevealing]);

  const canAnswer = !isCoachSpeaking || hasFinishedRevealing;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700 active:scale-95 transition-all"
        >
          <span className="text-lg">{roleIcon}</span>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-wider text-teal-400">
              မေးခွန်း #{questionIndex}
            </p>
            <p className="text-xs font-bold truncate max-w-[180px]">
              {questionText.slice(0, 24)}...
            </p>
          </div>
          <span className="text-xs ml-1 bg-slate-800 px-2 py-0.5 rounded-lg text-slate-300">
            ဖွင့်မည် ⬆️
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mb-4 animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-gradient-to-b from-white to-slate-50/90 rounded-2xl sm:rounded-3xl border-2 border-teal-500/40 shadow-xl shadow-teal-500/5 overflow-hidden transition-all">
        
        {/* Header Bar */}
        <div className="px-3.5 sm:px-5 py-2.5 bg-slate-900 text-white flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center text-sm shrink-0">
              {roleIcon}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-500 text-slate-950">
                  Question #{questionIndex}
                </span>
                <span className="text-xs font-bold text-slate-300 truncate">
                  {roleName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onRepeatQuestion && (
              <button
                type="button"
                onClick={onRepeatQuestion}
                className="p-1 sm:px-2 sm:py-1 rounded-lg text-[11px] font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
                title="မေးခွန်း ပြန်လည်ဖတ်ရှုမည်"
              >
                <span>🔄</span>
                <span className="hidden sm:inline">ပြန်ဖတ်မည်</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="အောက်သို့ လျှော့ချထားမည်"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* State Banner: Coach Speaking vs Candidate Answering */}
        <div className="px-3.5 sm:px-5 py-2 border-b border-slate-100 flex items-center justify-between gap-2 text-xs">
          {isCoachSpeaking ? (
            <div className="flex items-center gap-2 text-amber-700 font-bold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="text-[11px] sm:text-xs">
                သန္တာ မေးခွန်းမေးနေပါသည်... စကားလုံးများကို သေချာနားထောင်ပါ
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-700 font-bold animate-in fade-in duration-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] sm:text-xs flex items-center gap-1">
                <span>🎙️</span>
                <span>သင့်အလှည့်ဖြစ်ပါပြီ! မိုက်ခရိုဖုန်းဖြင့် စတင်ဖြေဆိုနိုင်ပါပြီ (You can answer now)</span>
              </span>
            </div>
          )}

          <span className="text-[10px] font-semibold text-slate-400 hidden xs:inline">
            {canAnswer ? 'Ready to Answer' : 'Listening...'}
          </span>
        </div>

        {/* Main Word-by-Word Question Text Box */}
        <div className="p-4 sm:p-6">
          <div className="min-h-[70px] sm:min-h-[85px] flex items-center">
            <h3 className="text-base sm:text-xl font-black text-slate-900 leading-relaxed tracking-tight">
              {tokens.map((token, idx) => {
                const isRevealed = idx < revealedCount;
                return (
                  <span
                    key={idx}
                    className={`inline-block transition-all duration-150 ${
                      isRevealed
                        ? 'opacity-100 translate-y-0 text-slate-900'
                        : 'opacity-0 translate-y-1 text-slate-300'
                    }`}
                  >
                    {token}
                  </span>
                );
              })}
              
              {/* Typing Cursor when revealing */}
              {!hasFinishedRevealing && isCoachSpeaking && (
                <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-teal-500 rounded-xs animate-pulse align-middle" />
              )}
            </h3>
          </div>

          {/* Live Candidate Voice Answer Bubble (if candidate is speaking) */}
          {candidateLiveAnswer && candidateLiveAnswer.trim().length > 0 && (
            <div className="mt-3 p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs sm:text-sm text-teal-950 animate-in fade-in duration-200">
              <p className="text-[10px] font-black uppercase tracking-wider text-teal-700 mb-1 flex items-center gap-1">
                <span>🗣️</span>
                <span>သင့်အဖြေ (Your Spoken Answer):</span>
              </p>
              <p className="font-semibold leading-relaxed">
                "{candidateLiveAnswer}"
              </p>
            </div>
          )}

          {/* Bottom Action bar & Tips */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <span className="text-teal-600 font-bold">💡 အကြံပြုချက်:</span>
              <span className="hidden sm:inline">STAR စနစ် (Situation, Task, Action, Result) ဖြင့်</span>
              <span>တည်ငြိမ်စွာ ဖြေဆိုပါ</span>
            </div>

            <div className="flex items-center gap-2">
              {canAnswer && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>မိုက်ခရိုဖုန်းဖွင့်ထားပါသည်</span>
                </span>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
