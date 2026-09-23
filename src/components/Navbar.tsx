import React from 'react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { AppLanguage, ViewState, UserProfile } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  currentLang: AppLanguage;
  onSelectLang: (lang: AppLanguage) => void;
  user: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentLang,
  onSelectLang,
  user,
}) => {
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0d13]/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 h-16 flex items-center justify-between transition-colors">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-6">
        <Logo size="md" onClick={() => onNavigate('globe')} />

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('globe')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentView === 'globe' || currentView === 'country' || currentView === 'wordList' || currentView === 'wordDetail'
                ? 'text-[#d8ff38] bg-[#d8ff38]/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {t.explore}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('saved')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'saved'
                ? 'text-[#d8ff38] bg-[#d8ff38]/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>{t.savedWords}</span>
            {user.savedWordIds.length > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#d8ff38] text-slate-950">
                {user.savedWordIds.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-3">
        <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} />

        {/* Profile Avatar */}
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs tracking-wider transition-all border ${
            currentView === 'profile'
              ? 'bg-[#d8ff38] text-slate-950 border-[#d8ff38] ring-2 ring-[#d8ff38]/30'
              : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500'
          }`}
          title={t.profile}
          aria-label={t.profile}
        >
          {user.avatarInitials}
        </button>
      </div>
    </header>
  );
};
