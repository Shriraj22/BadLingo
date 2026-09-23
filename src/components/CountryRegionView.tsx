import React, { useState } from 'react';
import { Country, Region, AppLanguage } from '../types';
import { translations } from '../data/translations';

interface CountryRegionViewProps {
  country: Country;
  currentLang: AppLanguage;
  onBack: () => void;
  onSelectRegion: (region: Region) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const CountryRegionView: React.FC<CountryRegionViewProps> = ({
  country,
  currentLang,
  onBack,
  onSelectRegion,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'overview' | 'regions' | 'culture'>('regions');

  return (
    <div className="min-h-[calc(100vh-64px)] pb-24 bg-[#0a0c12] text-slate-100">
      {/* Top Hero Banner */}
      <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
        <img
          src={country.bannerImage}
          alt={country.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-[#0a0c12]/50 to-black/30" />

        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-all active:scale-95"
            aria-label="Back"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onToggleFavorite}
            className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all active:scale-95 ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500 text-rose-500'
                : 'bg-black/60 border-white/20 text-white hover:text-rose-400'
            }`}
            aria-label="Save Country"
          >
            <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Country Header Info */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl drop-shadow-md">{country.flag}</span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              {country.name}
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 drop-shadow max-w-xl">
            {country.tagline[currentLang]}
          </p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="max-w-xl mx-auto px-4 mt-4">
        <div className="flex items-center border-b border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#d8ff38] text-[#d8ff38]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.overviewTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('regions')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all ${
              activeTab === 'regions'
                ? 'border-[#d8ff38] text-[#d8ff38]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.regionsTab} ({country.regions.length})
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

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="py-6 space-y-5 animate-in fade-in duration-150">
            <div className="bg-[#121622] border border-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                About Slang Culture
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {country.overview[currentLang]}
              </p>
            </div>

            <div className="bg-[#121622] border border-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Regional Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <div className="text-2xl font-black font-display text-[#d8ff38]">
                    {country.regions.length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Dialects & Regions</div>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <div className="text-2xl font-black font-display text-[#d8ff38]">
                    {country.regions.reduce((acc, r) => acc + r.words.length, 0)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Slang & Insults</div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectRegion(country.regions[0])}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#d8ff38] hover:bg-[#c9f228] text-slate-950 font-display font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#d8ff38]/20 transition-all active:scale-[0.98]"
            >
              <span>Explore {country.regions[0].name} Words</span>
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}

        {/* Tab 2: Regions List */}
        {activeTab === 'regions' && (
          <div className="py-5 space-y-3 animate-in fade-in duration-150">
            <div className="text-xs text-slate-400 px-1 font-medium">
              {t.selectRegion}
            </div>

            {country.regions.map((region) => (
              <button
                key={region.id}
                type="button"
                onClick={() => onSelectRegion(region)}
                className="w-full flex items-center justify-between p-4 bg-[#121622] hover:bg-[#192032] border border-slate-800 hover:border-slate-700 rounded-2xl transition-all group text-left shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  {/* Region photo icon / thumbnail */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                    <img
                      src={region.bannerImage || country.bannerImage}
                      alt={region.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white group-hover:text-[#d8ff38] transition-colors">
                      {region.name}
                    </h4>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {region.localLanguage}
                    </span>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 max-w-[240px] sm:max-w-xs">
                      {region.description[currentLang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-mono">
                    {region.words.length}
                  </span>
                  <svg
                    className="w-5 h-5 text-slate-500 group-hover:text-[#d8ff38] group-hover:translate-x-0.5 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tab 3: Culture & Etiquette */}
        {activeTab === 'culture' && (
          <div className="py-6 space-y-4 animate-in fade-in duration-150">
            <div className="bg-[#121622] border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>⚠️</span>
                <span>Etiquette & Warning</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {country.cultureNotes[currentLang]}
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
              <div className="font-bold text-slate-300 uppercase tracking-wider">Golden Rules:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Never swear at authority figures, taxi drivers, or elders.</li>
                <li>Listen first: pay attention to whether locals are laughing or angry.</li>
                <li>Pronunciation matters: the wrong inflection can change the whole meaning!</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
