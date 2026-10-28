import React from 'react';
import { BriefcaseIcon, LanguageIcon, MicIcon, ArrowRightIcon, LogInIcon, ThandarMark, SparkleIcon } from './Icons.tsx';

interface OnboardingProps {
  onGuest: () => void;
  onSignIn: () => void;
}

const STEPS = [
  {
    icon: BriefcaseIcon,
    my: 'အလုပ်နယ်ပယ်နှင့် ရာထူး ရွေးပါ',
    en: 'Choose your field and position',
  },
  {
    icon: LanguageIcon,
    my: 'ဘာသာစကား ရွေးပါ (မြန်မာ / English)',
    en: 'Choose the interview language',
  },
  {
    icon: MicIcon,
    my: 'START ကို နှိပ်ပြီး အသံဖြင့် ဖြေဆိုပါ',
    en: 'Press START and answer by voice',
  },
];

/** Welcome screen shown before login: what the app does, the 3 steps, and how to begin. */
export const Onboarding: React.FC<OnboardingProps> = ({ onGuest, onSignIn }) => (
  <main className="min-h-dvh bg-gradient-to-b from-teal-50 via-white to-white text-slate-900 flex items-center justify-center px-4 py-8 sm:py-12">
    <div className="w-full max-w-md">
      {/* Brand */}
      <div className="flex items-center justify-center gap-2.5 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/25">
          <ThandarMark className="w-6 h-6" />
        </div>
        <div className="leading-tight">
          <p className="text-base font-black tracking-tight">THANDAR</p>
          <p className="text-xs font-bold text-teal-700">AI Interview Coach</p>
        </div>
      </div>

      {/* Promise + question */}
      <div className="text-center mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full mb-3">
          <SparkleIcon className="w-3.5 h-3.5" />
          အလုပ်အင်တာဗျူး အောင်မြင်ဖို့ လေ့ကျင့်ပါ
        </p>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
          အင်တာဗျူး လေ့ကျင့်ဖို့ အသင့်ဖြစ်ပြီလား?
        </h1>
        <p className="text-base text-slate-600 mt-2 leading-relaxed">
          This app helps you pass your job interview.
          <br />
          <span className="font-semibold text-slate-800">Ready to take an interview practice test?</span>
        </p>
      </div>

      {/* 3 steps */}
      <ol className="space-y-2.5 mb-7" aria-label="How it works">
        {STEPS.map(({ icon: StepIcon, my, en }, i) => (
          <li key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm">
            <span className="w-9 h-9 shrink-0 rounded-full bg-teal-600 text-white text-sm font-black flex items-center justify-center" aria-hidden="true">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-snug">{my}</p>
              <p className="text-xs text-slate-600 mt-0.5">{en}</p>
            </div>
            <StepIcon className="w-5 h-5 text-teal-600 shrink-0" />
          </li>
        ))}
      </ol>

      {/* Actions: guest first so everyone can start immediately */}
      <button
        type="button"
        onClick={onGuest}
        className="w-full min-h-14 px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-black text-base shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/40"
      >
        <span className="text-left leading-tight">
          ဟုတ်ကဲ့၊ ဧည့်သည်အဖြစ် စမ်းမည်
          <span className="block text-xs font-semibold text-teal-50">Yes! Try as Guest — no sign-up needed</span>
        </span>
        <ArrowRightIcon className="w-5 h-5 shrink-0" />
      </button>

      <button
        type="button"
        onClick={onSignIn}
        className="w-full min-h-12 mt-3 px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/40"
      >
        <LogInIcon className="w-4.5 h-4.5" />
        အကောင့်ဝင်မည် / အကောင့်ဖွင့်မည် (Sign in / Register)
      </button>

      <p className="text-xs text-slate-500 text-center mt-4 leading-relaxed">
        အကောင့်ဖြင့် ဝင်ပါက နေ့စဉ် လေ့ကျင့်ခွင့်ကို သင့်အကောင့်အတွက်သာ သီးသန့် ရရှိပါမည်။
        <br />
        Signing in gives you your own daily practice allowance.
      </p>
    </div>
  </main>
);
