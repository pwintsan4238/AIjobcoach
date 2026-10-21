import React, { useState } from 'react';
import { User } from '../types.ts';
import { auth } from '../services/firebase.ts';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

interface AuthModalProps {
  onClose?: () => void;
  onAuthComplete: (user: User) => void;
  initialMode?: 'login' | 'register';
  isGated?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  onClose, 
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
    onAuthComplete({
      uid: 'guest-' + Date.now(),
      email: 'guest@thandar.ai',
      name: 'ဧည့်သည် (Guest)',
      isPaid: false
    });
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

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto ${
        isGated ? 'cursor-default' : ''
      }`}
      onClick={(e) => {
        if (!isGated && onClose && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white w-full max-w-sm sm:max-w-md my-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button if modal is optional */}
        {!isGated && onClose && (
          <button 
            onClick={onClose}
            className="absolute top-3.5 right-3.5 text-slate-500 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors z-10"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Brand Icon & Heading */}
          <div className="text-center mb-3 sm:mb-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-md shadow-teal-500/20 mx-auto mb-2">
              👸
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {mode === 'login' ? 'အကောင့်ဝင်ရောက်ရန်' : 'အကောင့်အသစ်ဖွင့်ရန်'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              သန္တာ (Thandar) - မြန်မာ့အလုပ်အင်တာဗျူး AI နည်းပြ
            </p>
          </div>

          {/* Segmented Mode Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex w-full max-w-[210px] mx-auto mb-3 sm:mb-4">
            <button 
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                mode === 'login' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                mode === 'register' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
            {mode === 'register' && (
              <div className="space-y-1">
                <label htmlFor="auth-name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  အမည် (Full Name)
                </label>
                <input 
                  required
                  id="auth-name"
                  autoComplete="name"
                  type="text" 
                  placeholder="ဥပမာ - မသန္တာ"
                  className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 bg-slate-50 focus:bg-white outline-none transition-all text-xs sm:text-sm font-semibold"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            
            <div className="space-y-1">
              <label htmlFor="auth-email" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                အီးမေးလ် (Email Address)
              </label>
              <input 
                required
                id="auth-email"
                autoComplete="email"
                type="email" 
                placeholder="name@example.com"
                className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 bg-slate-50 focus:bg-white outline-none transition-all text-xs sm:text-sm font-semibold"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="auth-password" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                စကားဝှက် (Password)
              </label>
              <input 
                required
                id="auth-password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                type="password" 
                placeholder="••••••••"
                className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 bg-slate-50 focus:bg-white outline-none transition-all text-xs sm:text-sm font-semibold"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {error && (
              <div className="p-2 sm:p-2.5 bg-rose-50 border border-rose-200/80 rounded-xl">
                <p className="text-rose-600 text-[11px] font-medium text-center leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full bg-slate-900 hover:bg-black text-white py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md shadow-slate-900/10 mt-1 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>ဆောင်ရွက်နေပါသည်...</span>
                </>
              ) : (
                mode === 'login' ? 'အကောင့်ဝင်ရောက်မည် ➡️' : 'အကောင့်ဖွင့်ပြီး စတင်မည် 🚀'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-3 sm:my-3.5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200/70" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase font-bold tracking-wider text-slate-500">
              <span className="bg-white px-2">သို့မဟုတ် (Or)</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button 
            type="button"
            disabled={isProcessing}
            onClick={handleGoogleSignIn}
            className="w-full bg-white border border-slate-200 text-slate-700 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google ဖြင့် ဝင်ရောက်မည်</span>
          </button>

          {/* Quick Guest Access */}
          <button 
            type="button"
            disabled={isProcessing}
            onClick={handleGuestAccess}
            className="w-full mt-2 py-2 px-3 bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 text-teal-900 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>✨</span>
            <span>ဧည့်သည်အဖြစ် တိုက်ရိုက်စမ်းသပ်မည် (Try as Guest)</span>
          </button>

        </div>
      </div>
    </div>
  );
};
