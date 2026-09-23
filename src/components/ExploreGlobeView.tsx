import React, { useState, useMemo } from 'react';
import { Globe3D } from './Globe3D';
import { Country, Region, AppLanguage } from '../types';
import { translations } from '../data/translations';

interface ExploreGlobeViewProps {
  countries: Country[];
  currentLang: AppLanguage;
  onSelectCountry: (country: Country) => void;
  onOpenSurpriseMe: () => void;
}

export const ExploreGlobeView: React.FC<ExploreGlobeViewProps> = ({
  countries,
  currentLang,
  onSelectCountry,
  onOpenSurpriseMe,
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries[0] || null);

  // Search filter matching country name or region name
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const results: Array<{ country: Country; matchedRegion?: Region }> = [];

    countries.forEach((country) => {
      if (country.name.toLowerCase().includes(q)) {
        results.push({ country });
      } else {
        const foundRegion = country.regions.find((r) => r.name.toLowerCase().includes(q));
        if (foundRegion) {
          results.push({ country, matchedRegion: foundRegion });
        }
      }
    });

    return results;
  }, [searchQuery, countries]);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] flex flex-col bg-[#080a10] overflow-hidden">
      {/* Top Floating Search Bar */}
      <div className="absolute top-4 left-0 right-0 z-30 px-4 max-w-md mx-auto pointer-events-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-10 py-2.5 bg-[#121622]/90 backdrop-blur-md border border-slate-700/80 focus:border-[#d8ff38] rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none shadow-xl transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#121622] border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 z-40 max-h-60 overflow-y-auto">
              {searchResults.map(({ country, matchedRegion }) => (
                <button
                  key={`${country.id}-${matchedRegion?.id || 'country'}`}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(country);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{country.flag}</span>
                    <div>
                      <span className="text-xs font-bold text-white block">{country.name}</span>
                      {matchedRegion && (
                        <span className="text-[11px] text-[#d8ff38]">
                          {matchedRegion.name} ({matchedRegion.localLanguage})
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                    {country.regions.length} regions
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3D Interactive Canvas Globe */}
      <div className="flex-1 w-full h-full relative">
        <Globe3D
          countries={countries}
          selectedCountryId={selectedCountry?.id}
          onSelectCountry={(c) => setSelectedCountry(c)}
          interactive={true}
          autoRotate={!searchQuery}
          showSpeechBubbles={false}
          className="w-full h-full"
          zoomLevel={1.05}
        />
      </div>

      {/* Floating Bottom Card / Controls */}
      <div className="absolute bottom-20 md:bottom-8 left-0 right-0 z-30 px-4 max-w-md mx-auto pointer-events-none flex flex-col gap-3">
        {/* Selected Country Card */}
        {selectedCountry && (
          <div className="pointer-events-auto bg-[#111520]/95 backdrop-blur-md border border-slate-700/80 rounded-3xl p-4 shadow-2xl transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl drop-shadow">{selectedCountry.flag}</span>
                <div>
                  <h3 className="font-display text-base font-extrabold text-white">
                    {selectedCountry.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 max-w-[200px] sm:max-w-xs truncate">
                    {selectedCountry.tagline[currentLang]}
                  </p>
                </div>
              </div>

              {/* Explore Words CTA */}
              <button
                type="button"
                onClick={() => onSelectCountry(selectedCountry)}
                className="py-2.5 px-4 rounded-xl bg-[#d8ff38] hover:bg-[#c9f228] text-slate-950 font-display font-bold text-xs tracking-wide flex items-center gap-1.5 shadow-lg shadow-[#d8ff38]/20 active:scale-95 transition-all whitespace-nowrap"
              >
                <span>{t.exploreWords}</span>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Surprise Me Floating Trigger */}
        <button
          type="button"
          onClick={onOpenSurpriseMe}
          className="pointer-events-auto w-full py-3 px-4 rounded-2xl bg-[#141926]/90 hover:bg-[#1b2234] border border-slate-700/80 hover:border-[#d8ff38]/50 text-slate-100 flex items-center justify-center gap-2 text-xs font-bold shadow-xl active:scale-[0.99] transition-all group"
        >
          <span className="text-base group-hover:scale-125 transition-transform">⭐</span>
          <span className="text-[#d8ff38] font-display">{t.surpriseMe} 🤯</span>
          <span className="text-slate-400 font-normal">· {t.takeMeRandom}</span>
        </button>
      </div>
    </div>
  );
};
