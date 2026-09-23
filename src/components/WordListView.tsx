import React, { useState } from 'react';
import { Country, Region, WordItem, AppLanguage } from '../types';
import { translations } from '../data/translations';

interface WordListViewProps {
  country: Country;
  region: Region;
  currentLang: AppLanguage;
  onBack: () => void;
  onSelectWord: (word: WordItem) => void;
  onSurpriseMe: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  savedWordIds: string[];
}

export const WordListView: React.FC<WordListViewProps> = ({
  country,
  region,
  currentLang,
  onBack,
  onSelectWord,
  onSurpriseMe,
  isFavorite = false,
  onToggleFavorite,
  savedWordIds,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'words' | 'about' | 'culture'>('words');

  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case 'Mild':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/40 bg-emerald-950/40 text-emerald-400">
            {t.intensityMild}
          </span>
        );
      case 'Offensive':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-500/40 bg-amber-950/40 text-amber-400">
            {t.intensityOffensive}
          </span>
        );
      case 'Very Offensive':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-rose-500/40 bg-rose-950/40 text-rose-400">
            {t.intensityVeryOffensive}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pb-24 bg-[#0a0c12] text-slate-100 max-w-xl mx-auto px-4 pt-3">
      {/* Top Header */}
      <div className="flex items-center justify-between py-3 border-b border-slate-800/80">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Back"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 font-display font-extrabold text-base text-white">
            <span>{country.flag}</span>
            <span>{country.name}</span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            {region.name} · {region.localLanguage}
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          className={`p-2 -mr-2 rounded-xl transition-colors ${
            isFavorite ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'
          }`}
          aria-label="Favorite"
        >
          <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Segmented Tabs */}
      <div className="flex items-center border-b border-slate-800 mt-2">
        <button
          type="button"
          onClick={() => setActiveTab('words')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all ${
            activeTab === 'words'
              ? 'border-[#d8ff38] text-[#d8ff38]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.wordsTab} ({region.words.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all ${
            activeTab === 'about'
              ? 'border-[#d8ff38] text-[#d8ff38]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.aboutTab}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('culture')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all ${
            activeTab === 'culture'
              ? 'border-[#d8ff38] text-[#d8ff38]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.cultureTab}
        </button>
      </div>

      {/* Tab 1: Top Words List */}
      {activeTab === 'words' && (
        <div className="py-4 space-y-2.5 animate-in fade-in duration-150">
          {region.words.map((word, index) => {
            const isSaved = savedWordIds.includes(word.id);
            return (
              <div
                key={word.id}
                onClick={() => onSelectWord(word)}
                className="w-full flex items-center justify-between p-3.5 bg-[#121622] hover:bg-[#182032] border border-slate-800/80 hover:border-slate-700 rounded-2xl cursor-pointer transition-all active:scale-[0.99] group shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  {/* Number Index */}
                  <span className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-base font-extrabold text-white group-hover:text-[#d8ff38] transition-colors">
                        {word.nativeWord}
                      </span>
                      {isSaved && (
                        <span className="text-[11px] text-[#d8ff38]" title="Saved">
                          ★
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {word.transliteration}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="mb-1">{getIntensityBadge(word.intensity)}</div>
                    <div className="text-[11px] text-slate-300 max-w-[130px] sm:max-w-[170px] truncate">
                      {word.meanings[currentLang]}
                    </div>
                  </div>

                  <svg
                    className="w-4 h-4 text-slate-500 group-hover:text-[#d8ff38] group-hover:translate-x-0.5 transition-all flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}

          {/* Bottom Surprise Me Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={onSurpriseMe}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#141926] hover:bg-[#1a2133] border border-slate-700/80 text-[#d8ff38] font-display font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
            >
              <span>{t.surpriseMe} 🤯</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: About Region */}
      {activeTab === 'about' && (
        <div className="py-5 space-y-4 animate-in fade-in duration-150">
          <div className="bg-[#121622] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Region Description
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {region.description[currentLang]}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-white">Language & Dialect Notes:</div>
            <div>
              Primary local dialect: <span className="text-[#d8ff38] font-bold">{region.localLanguage}</span>
            </div>
            <div>
              Total words in this dictionary: <span className="font-mono text-white">{region.words.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Culture */}
      {activeTab === 'culture' && (
        <div className="py-5 space-y-4 animate-in fade-in duration-150">
          <div className="bg-[#121622] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Cultural Nuances
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {country.cultureNotes[currentLang]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
