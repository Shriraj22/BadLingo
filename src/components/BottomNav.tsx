import React from 'react';
import { ViewState, AppLanguage } from '../types';
import { translations } from '../data/translations';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  currentLang: AppLanguage;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  currentLang,
  savedCount,
}) => {
  const t = translations[currentLang];

  const isExplore =
    currentView === 'globe' ||
    currentView === 'country' ||
    currentView === 'wordList' ||
    currentView === 'wordDetail';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0d13]/90 backdrop-blur-lg border-t border-slate-800/90 px-6 py-2">
      <div className="grid grid-cols-3 items-center max-w-sm mx-auto">
        {/* 1. Explore */}
        <button
          type="button"
          onClick={() => onNavigate('globe')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            isExplore ? 'text-[#d8ff38]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20" />
          </svg>
          <span className="text-[11px] font-semibold mt-1">{t.explore}</span>
        </button>

        {/* 2. Saved */}
        <button
          type="button"
          onClick={() => onNavigate('saved')}
          className={`flex flex-col items-center justify-center py-1 relative transition-all ${
            currentView === 'saved' ? 'text-[#d8ff38]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <svg className="w-5 h-5" fill={currentView === 'saved' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-3 px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-[#d8ff38] text-slate-950">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold mt-1">{t.savedWords}</span>
        </button>

        {/* 3. Profile */}
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentView === 'profile' ? 'text-[#d8ff38]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <svg className="w-5 h-5" fill={currentView === 'profile' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[11px] font-semibold mt-1">{t.profile}</span>
        </button>
      </div>
    </nav>
  );
};
