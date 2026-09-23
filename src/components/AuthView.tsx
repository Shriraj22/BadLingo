import React, { useState } from 'react';
import { Logo } from './Logo';
import { AppLanguage, UserProfile } from '../types';
import { translations } from '../data/translations';

interface AuthViewProps {
  currentLang: AppLanguage;
  initialMode?: 'login' | 'signup';
  onSuccess: (user: Partial<UserProfile>) => void;
  onBack: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  currentLang,
  initialMode = 'signup',
  onSuccess,
  onBack,
}) => {
  const t = translations[currentLang];
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [fullName, setFullName] = useState(mode === 'signup' ? 'Shriraj Deshmukh' : '');
  const [email, setEmail] = useState('shriraj.deshmukh2027@mastersunion.org');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const name = fullName.trim() || (mode === 'signup' ? 'Shriraj Deshmukh' : email.split('@')[0]);
      const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'SD';

      onSuccess({
        name,
        email,
        avatarInitials: initials,
      });
    }, 400);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        name: 'Shriraj Deshmukh',
        email: 'shriraj.deshmukh2027@mastersunion.org',
        avatarInitials: 'SD',
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          aria-label="Go back"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <Logo size="sm" onClick={onBack} />
        <div className="w-8" /> {/* spacer */}
      </div>

      {/* Main Form Container */}
      <div className="my-auto py-6">
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl font-extrabold text-white">
            {mode === 'signup' ? t.createAccount : t.welcomeBack}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {mode === 'signup' ? t.signUpSubtitle : t.loginSubtitle}
          </p>
        </div>

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm flex items-center justify-center gap-3 shadow-md active:scale-[0.99] transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>{t.continueWithGoogle}</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-800" />
          <span className="px-3 text-xs font-bold text-slate-500 tracking-wider">{t.or}</span>
          <div className="flex-1 border-t border-slate-800" />
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t.fullName}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Shriraj Deshmukh"
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-800 focus:border-[#d8ff38] rounded-xl text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t.email}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-800 focus:border-[#d8ff38] rounded-xl text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-400">{t.password}</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="text-xs font-semibold text-[#d8ff38] hover:underline"
                >
                  {t.forgotPassword}
                </button>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 bg-slate-900/90 border border-slate-800 focus:border-[#d8ff38] rounded-xl text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {forgotSent && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300">
              Reset link sent to {email}. You can still log in directly!
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 rounded-2xl bg-[#d8ff38] hover:bg-[#c9f228] text-slate-950 font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#d8ff38]/20 active:scale-[0.98] transition-all"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : mode === 'signup' ? (
              t.signUp
            ) : (
              t.login
            )}
          </button>

          {mode === 'signup' && (
            <p className="text-[11px] text-slate-500 text-center leading-relaxed pt-1">
              {t.termsAgreement}
            </p>
          )}

          {/* Toggle between Login and Signup */}
          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signup' ? 'login' : 'signup');
                setForgotSent(false);
              }}
              className="text-xs font-semibold text-slate-300 hover:text-white"
            >
              {mode === 'signup' ? t.alreadyHaveAccount : t.dontHaveAccount}
            </button>
          </div>
        </form>
      </div>

      {/* Playful Bottom Doodle Box */}
      <div className="relative pt-6 pb-2 text-center border-t border-slate-800/60 flex items-center justify-between px-2">
        <div className="text-left">
          <div className="text-xs font-bold text-[#d8ff38] tracking-wider uppercase">
            {mode === 'signup' ? 'GOOD PEOPLE LEARN BAD WORDS TOO.' : 'DIFFERENT LANGUAGES. SAME ENERGY.'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Safe learning · Real street slang · No boring grammar
          </div>
        </div>
        <div className="text-2xl animate-bounce">
          {mode === 'signup' ? '😈' : '⚡'}
        </div>
      </div>
    </div>
  );
};
