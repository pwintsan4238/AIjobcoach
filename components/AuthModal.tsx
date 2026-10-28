import React, { useState } from 'react';
import { User } from '../types.ts';
import { auth } from '../services/firebase.ts';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { ThandarMark, UserIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons.tsx';

export const makeGuestUser = (): User => ({
  uid: 'guest-' + Date.now(),
  email: 'guest@thandar.ai',
  name: 'ဧည့်သည် (Guest)',
  isPaid: false
});

interface AuthModalProps {
  onClose?: () => void;
  /** Back to the welcome screen */
  onBack?: () => void;
  onAuthComplete: (user: User) => void;
  initialMode?: 'login' | 'register';
  isGated?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  onClose,
  onBack,
  onAuthComplete, 
  initialMode = 'login', 
  isGated = false 
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setIsProcessing(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onAuthComplete({
        uid: result.user.uid,
        email: result.user.email || '',
        name: result.user.displayName || 'Candidate',
        isPaid: false
      });
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain') {
        setError(`Domain "${window.location.hostname}" is not authorized yet. Use Guest login below to test immediately!`);
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in popup was closed.');
      } else {
        setError('Google sign-in could not be completed. Please try with email or guest access.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGuestAccess = () => {
    onAuthComplete(makeGuestUser());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      if (mode === 'login') {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
          onAuthComplete({
            uid: userCredential.user.uid,
            email: userCredential.user.email || '',
            name: userCredential.user.displayName || formData.email.split('@')[0] || 'Candidate',
            isPaid: false
          });
        } catch (err: any) {
          if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
            setError('အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည် (Incorrect email or password)');
          } else {
            setError(err.message || 'Login failed. Please verify credentials or continue as guest.');
          }
        }
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
          onAuthComplete({
            uid: userCredential.user.uid,
            email: userCredential.user.email || '',
            name: formData.name || 'Candidate',
            isPaid: false
          });
        } catch (err: any) {
          if (err.code === 'auth/email-already-in-use') {
            setError('ဤအီးမေးလ်ဖြင့် အကောင့်ဖွင့်ပြီးပါပြီ။ Login ဝင်ရောက်ပေးပါ။');
          } else if (err.code === 'auth/weak-password') {
            setError('စကားဝှက်သည် အနည်းဆုံး ၆ လုံး ရှိရပါမည် (Password should be at least 6 characters)');
          } else {
            setError(err.message || 'Registration failed');
          }
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const inputClass =
    'w-full min-h-11 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 bg-white outline-none transition-colors text-base sm:text-sm font-medium text-slate-900 placeholder:text-slate-400';
  const labelClass = 'text-xs font-bold text-slate-700 block mb-1';

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 py-6 overflow-y-auto ${
        isGated ? 'bg-gradient-to-b from-teal-50 via-white to-white' : 'bg-slate-900/60 backdrop-blur-sm'
      }`}
      onClick={(e) => {
        if (!isGated && onClose && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative bg-white w-full max-w-md my-auto rounded-3xl shadow-xl border border-slate-200 motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200">

        {/* Back to the welcome screen */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute top-3 left-3 min-h-11 px-3 inline-flex items-center gap-1.5 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/40"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            နောက်သို့ (Back)
          </button>
        )}

        {/* Close Button if modal is optional */}
        {!isGated && onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="px-5 pb-6 pt-16 sm:px-8 sm:pb-8">

          {/* Brand Icon & Heading */}
          <div className="text-center mb-5">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-teal-600/25 mx-auto mb-3">
              <ThandarMark className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {mode === 'login' ? 'အကောင့်ဝင်ရောက်ရန်' : 'အကောင့်အသစ်ဖွင့်ရန်'}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              သန္တာ (Thandar) - မြန်မာ့အလုပ်အင်တာဗျူး AI နည်းပြ
            </p>
          </div>

          {/* Guest access first: always visible, no account needed */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleGuestAccess}
            className="w-full min-h-14 px-4 py-3 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white rounded-2xl font-black text-base shadow-md shadow-teal-600/20 transition-colors flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/40"
          >
            <UserIcon className="w-5 h-5 shrink-0" />
            <span className="text-left leading-tight">
              ဧည့်သည်အဖြစ် စမ်းသပ်မည်
              <span className="block text-xs font-semibold text-teal-50">Try as Guest — no account needed</span>
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-5" aria-hidden="true">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs font-bold text-slate-500">
              <span className="bg-white px-3">သို့မဟုတ် အကောင့်ဖြင့် (Or with an account)</span>
            </div>
          </div>

          {/* Segmented Mode Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex w-full mb-4" role="tablist" aria-label="Sign in or register">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 min-h-10 text-sm font-bold rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 ${
                  mode === m ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <div>
                <label htmlFor="auth-name" className={labelClass}>
                  အမည် (Full Name)
                </label>
                <input
                  required
                  id="auth-name"
                  autoComplete="name"
                  type="text"
                  placeholder="ဥပမာ - မသန္တာ"
                  className={inputClass}
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className={labelClass}>
                အီးမေးလ် (Email Address)
              </label>
              <input
                required
                id="auth-email"
                autoComplete="email"
                type="email"
                inputMode="email"
                placeholder="name@example.com"
                className={inputClass}
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="auth-password" className={labelClass}>
                စကားဝှက် (Password)
              </label>
              <input
                required
                id="auth-password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                type="password"
                placeholder="••••••••"
                className={inputClass}
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {error && (
              <div role="alert" className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <p className="text-rose-700 text-sm font-medium text-center leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full min-h-12 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full motion-safe:animate-spin" aria-hidden="true" />
                  <span>ဆောင်ရွက်နေပါသည်...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'အကောင့်ဝင်ရောက်မည် (Login)' : 'အကောင့်ဖွင့်ပြီး စတင်မည် (Register)'}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Google Sign In */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleGoogleSignIn}
            className="w-full min-h-12 mt-3 bg-white border border-slate-300 text-slate-800 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/40"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google ဖြင့် ဝင်ရောက်မည်</span>
          </button>

        </div>
      </div>
    </div>
  );
};
