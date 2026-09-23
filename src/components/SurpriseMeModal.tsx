import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Country, WordItem, Region, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { speakWord } from '../utils/speech';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  countries: Country[];
  currentLang: AppLanguage;
  onExploreCountry: (country: Country, region: Region, word?: WordItem) => void;
}

export const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({
  isOpen,
  onClose,
  countries,
  currentLang,
  onExploreCountry,
}) => {
  const t = translations[currentLang];
  const [selectedItem, setSelectedItem] = useState<{
    country: Country;
    region: Region;
    word: WordItem;
  } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const pickRandomWord = () => {
    // Collect all words across all countries and regions
    const pool: Array<{ country: Country; region: Region; word: WordItem }> = [];
    countries.forEach((country) => {
      country.regions.forEach((region) => {
        region.words.forEach((word) => {
          pool.push({ country, region, word });
        });
      });
    });

    if (pool.length > 0) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      const chosen = pool[randomIndex];
      setSelectedItem(chosen);

      // Trigger confetti burst
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#d8ff38', '#ff3b30', '#ff9f0a', '#38bdf8', '#ffffff'],
        });
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      pickRandomWord();
    }
  }, [isOpen]);

  if (!isOpen || !selectedItem) return null;

  const { country, region, word } = selectedItem;

  const handlePlayAudio = async () => {
    setIsPlayingAudio(true);
    await speakWord(word.nativeWord, word.languageCode);
    setIsPlayingAudio(false);
  };

  const getIntensityBadgeClass = (intensity: string) => {
    switch (intensity) {
      case 'Mild':
        return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40';
      case 'Offensive':
        return 'text-amber-400 border-amber-500/50 bg-amber-950/40';
      case 'Very Offensive':
        return 'text-rose-400 border-rose-500/50 bg-rose-950/40';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-900';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#10141f] border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col items-center text-center overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <h3 className="font-display text-2xl font-black text-white mt-1 flex items-center gap-2">
          <span>{t.surpriseTitle}</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">{t.surpriseSubtitle}</p>

        {/* Country & Slang Card */}
        <div className="w-full mt-5 bg-gradient-to-b from-[#182032] to-[#121724] border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl text-left">
          {/* Banner image or stylized gradient */}
          <div className="relative h-32 w-full overflow-hidden bg-slate-900">
            <img
              src={country.bannerImage}
              alt={country.name}
              className="w-full h-full object-cover opacity-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#182032] via-[#182032]/40 to-transparent" />
            
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <span className="text-2xl drop-shadow">{country.flag}</span>
              <div>
                <span className="text-sm font-bold text-white tracking-wide block drop-shadow">
                  {country.name}
                </span>
                <span className="text-[11px] text-slate-300">
                  {region.name} · {word.languageName}
                </span>
              </div>
            </div>
          </div>

          {/* Word Body */}
          <div className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-display font-extrabold text-white tracking-tight">
                  {word.nativeWord}
                </div>
                <div className="text-sm text-slate-400 mt-0.5 font-medium">
                  {word.transliteration}
                </div>
              </div>

              {/* Pronunciation Read Aloud Button */}
              <button
                type="button"
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className={`p-3 rounded-full border border-slate-700 hover:border-[#d8ff38] bg-slate-800 text-slate-200 hover:text-[#d8ff38] transition-all active:scale-95 ${
                  isPlayingAudio ? 'animate-pulse text-[#d8ff38] border-[#d8ff38]' : ''
                }`}
                title="Read Aloud"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            </div>

            {/* Intensity Badge */}
            <div className="mt-3">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getIntensityBadgeClass(word.intensity)}`}>
                {word.intensity === 'Mild' ? t.intensityMild : word.intensity === 'Offensive' ? t.intensityOffensive : t.intensityVeryOffensive}
              </span>
            </div>

            {/* Meaning in selected language */}
            <div className="mt-3.5 pt-3.5 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.meaning}
              </span>
              <p className="text-sm font-semibold text-slate-100 mt-0.5">
                {word.meanings[currentLang]}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-5 space-y-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onExploreCountry(country, region, word);
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#d8ff38] hover:bg-[#c9f228] text-slate-950 font-display font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#d8ff38]/20 active:scale-[0.98] transition-all"
          >
            <span>{t.exploreTopWords}</span>
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            type="button"
            onClick={pickRandomWord}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            {t.tryAnotherCountry}
          </button>
        </div>
      </div>
    </div>
  );
};
