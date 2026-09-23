import React, { useState, useMemo } from 'react';
import { Country, Region, WordItem, AppLanguage } from '../types';
import { translations } from '../data/translations';

interface SavedWordsViewProps {
  countries: Country[];
  savedWordIds: string[];
  currentLang: AppLanguage;
  onSelectWord: (country: Country, region: Region, word: WordItem) => void;
  onRemoveSaved: (wordId: string) => void;
  onStartExploring: () => void;
}

export const SavedWordsView: React.FC<SavedWordsViewProps> = ({
  countries,
  savedWordIds,
  currentLang,
  onSelectWord,
  onRemoveSaved,
  onStartExploring,
}) => {
  const t = translations[currentLang];
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('all');
  const [selectedIntensityFilter, setSelectedIntensityFilter] = useState<string>('all');

  // Collect all saved word records with parent country and region info
  const allSavedWords = useMemo(() => {
    const list: Array<{ country: Country; region: Region; word: WordItem }> = [];
    countries.forEach((country) => {
      country.regions.forEach((region) => {
        region.words.forEach((word) => {
          if (savedWordIds.includes(word.id)) {
            list.push({ country, region, word });
          }
        });
      });
    });
    return list;
  }, [countries, savedWordIds]);

  // Apply country and intensity filters
  const filteredWords = useMemo(() => {
    return allSavedWords.filter(({ country, word }) => {
      if (selectedCountryFilter !== 'all' && country.id !== selectedCountryFilter) {
        return false;
      }
      if (selectedIntensityFilter !== 'all' && word.intensity !== selectedIntensityFilter) {
        return false;
      }
      return true;
    });
  }, [allSavedWords, selectedCountryFilter, selectedIntensityFilter]);

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
    <div className="min-h-[calc(100vh-64px)] pb-24 bg-[#0a0c12] text-slate-100 max-w-xl mx-auto px-4 pt-4">
      {/* Title */}
      <div className="mb-5">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          {t.savedWordsTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.savedWordsSubtitle}
        </p>
      </div>

      {/* Filters (Country & Intensity) */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {/* Country Filter */}
        <div className="relative flex-1 min-w-[140px]">
          <select
            value={selectedCountryFilter}
            onChange={(e) => setSelectedCountryFilter(e.target.value)}
            className="w-full appearance-none bg-[#121622] border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 outline-none pr-8 cursor-pointer"
          >
            <option value="all">🌐 {t.allCountries}</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Intensity Filter */}
        <div className="relative flex-1 min-w-[140px]">
          <select
            value={selectedIntensityFilter}
            onChange={(e) => setSelectedIntensityFilter(e.target.value)}
            className="w-full appearance-none bg-[#121622] border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 outline-none pr-8 cursor-pointer"
          >
            <option value="all">⚡ {t.allIntensities}</option>
            <option value="Mild">{t.intensityMild}</option>
            <option value="Offensive">{t.intensityOffensive}</option>
            <option value="Very Offensive">{t.intensityVeryOffensive}</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Word Cards List */}
      {filteredWords.length > 0 ? (
        <div className="space-y-3">
          {filteredWords.map(({ country, region, word }) => (
            <div
              key={word.id}
              onClick={() => onSelectWord(country, region, word)}
              className="w-full flex items-center justify-between p-4 bg-[#121622] hover:bg-[#182032] border border-slate-800 rounded-2xl cursor-pointer transition-all active:scale-[0.99] group shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-2xl flex-shrink-0 drop-shadow">{country.flag}</span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-base font-extrabold text-white group-hover:text-[#d8ff38] transition-colors">
                      {word.nativeWord}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-medium">
                      ({word.transliteration})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {region.localLanguage} · {country.name}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 max-w-[200px] sm:max-w-xs truncate">
                    {word.meanings[currentLang]}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">{getIntensityBadge(word.intensity)}</div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSaved(word.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Remove from saved"
                  aria-label="Remove"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-[#121622]/40 border border-slate-800/80 rounded-3xl mt-4">
          <div className="text-4xl mb-3">🌶️</div>
          <h3 className="font-display text-lg font-bold text-white mb-1">
            {t.noSavedWords}
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
            {t.noSavedWordsDesc}
          </p>
          <button
            type="button"
            onClick={onStartExploring}
            className="py-3 px-6 rounded-2xl bg-[#d8ff38] hover:bg-[#c9f228] text-slate-950 font-display font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#d8ff38]/20 transition-all active:scale-95"
          >
            {t.startExploring}
          </button>
        </div>
      )}
    </div>
  );
};
