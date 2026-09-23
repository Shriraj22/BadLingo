import React from 'react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { Globe3D } from './Globe3D';
import { Country, AppLanguage } from '../types';
import { translations } from '../data/translations';

interface LandingPageProps {
  countries: Country[];
  currentLang: AppLanguage;
  onSelectLang: (lang: AppLanguage) => void;
  onGetStarted: () => void;
  onExploreGlobe: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  countries,
  currentLang,
  onSelectLang,
  onGetStarted,
  onExploreGlobe,
}) => {
  const t = translations[currentLang];

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between overflow-hidden">
      {/* Background radial gradients for mood */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#1b263b]/30 via-[#0d1527]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-30 w-full px-5 py-5 sm:px-8 max-w-6xl mx-auto flex items-center justify-between">
        <Logo size="lg" />
        <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} />
      </header>

      {/* Center Hero Content */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto text-center py-4">
        {/* Cheeky Street Tag Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#d8ff38]/30 shadow-lg shadow-[#d8ff38]/10 text-xs font-mono font-bold tracking-wider text-[#d8ff38] uppercase mb-4 select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8ff38] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d8ff38]" />
          </span>
          <span>STREET DICTIONARY · ZERO FILTER</span>
          <span className="text-[10px] bg-[#f43f5e] text-white font-black px-1.5 py-0.5 rounded tracking-normal ml-0.5 shadow-sm">
            RAW
          </span>
        </div>

        {/* Funky Theme-Matching Headline */}
        {currentLang === 'en' ? (
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[1.08] max-w-3xl text-balance group cursor-default select-none">
            <span className="block text-slate-100">
              LEARN THE{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#d8ff38] via-[#bef264] to-[#38bdf8] drop-shadow-[0_0_30px_rgba(216,255,56,0.4)] transition-transform hover:scale-105">
                WORDS
                {/* Playful squiggly neon marker underline */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#e84393] overflow-visible"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,12 Q20,3 40,12 T80,12 T100,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
            <span className="block mt-2 sm:mt-3">
              THEY{' '}
              <span className="font-marker font-normal text-[#f43f5e] tracking-normal inline-block transform -rotate-3 text-3xl sm:text-5xl md:text-6xl mx-1 align-baseline drop-shadow-[0_2px_12px_rgba(244,63,94,0.45)] hover:rotate-0 transition-transform">
                DON'T
              </span>{' '}
              <span className="relative inline-block bg-[#d8ff38] text-slate-950 px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl rotate-1 shadow-[4px_4px_0px_#e84393] sm:shadow-[5px_5px_0px_#e84393] border-2 border-slate-950 font-black tracking-normal transition-transform hover:rotate-0">
                TEACH YOU.
              </span>
            </span>
          </h1>
        ) : currentLang === 'es' ? (
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[1.08] max-w-3xl text-balance group cursor-default select-none">
            <span className="block text-slate-100">
              APRENDE LAS{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#d8ff38] via-[#bef264] to-[#38bdf8] drop-shadow-[0_0_30px_rgba(216,255,56,0.4)]">
                PALABRAS
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#e84393] overflow-visible"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,12 Q20,3 40,12 T80,12 T100,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
            <span className="block mt-2 sm:mt-3">
              QUE{' '}
              <span className="font-marker font-normal text-[#f43f5e] tracking-normal inline-block transform -rotate-3 text-3xl sm:text-5xl md:text-6xl mx-1 align-baseline drop-shadow-[0_2px_12px_rgba(244,63,94,0.45)]">
                NO TE
              </span>{' '}
              <span className="relative inline-block bg-[#d8ff38] text-slate-950 px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl rotate-1 shadow-[4px_4px_0px_#e84393] sm:shadow-[5px_5px_0px_#e84393] border-2 border-slate-950 font-black tracking-normal">
                ENSEÑAN.
              </span>
            </span>
          </h1>
        ) : currentLang === 'fr' ? (
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[1.08] max-w-3xl text-balance group cursor-default select-none">
            <span className="block text-slate-100">
              APPRENEZ LES{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#d8ff38] via-[#bef264] to-[#38bdf8] drop-shadow-[0_0_30px_rgba(216,255,56,0.4)]">
                MOTS
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#e84393] overflow-visible"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,12 Q20,3 40,12 T80,12 T100,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
            <span className="block mt-2 sm:mt-3">
              QU'ON{' '}
              <span className="font-marker font-normal text-[#f43f5e] tracking-normal inline-block transform -rotate-3 text-3xl sm:text-5xl md:text-6xl mx-1 align-baseline drop-shadow-[0_2px_12px_rgba(244,63,94,0.45)]">
                NE VOUS
              </span>{' '}
              <span className="relative inline-block bg-[#d8ff38] text-slate-950 px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl rotate-1 shadow-[4px_4px_0px_#e84393] sm:shadow-[5px_5px_0px_#e84393] border-2 border-slate-950 font-black tracking-normal">
                ENSEIGNE PAS.
              </span>
            </span>
          </h1>
        ) : (
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[1.08] max-w-3xl text-balance group cursor-default select-none">
            <span className="block text-slate-100">
              वो{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#d8ff38] via-[#bef264] to-[#38bdf8] drop-shadow-[0_0_30px_rgba(216,255,56,0.4)]">
                शब्द
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#e84393] overflow-visible"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,12 Q20,3 40,12 T80,12 T100,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              सीखो
            </span>
            <span className="block mt-2 sm:mt-3">
              जो{' '}
              <span className="font-marker font-normal text-[#f43f5e] tracking-normal inline-block transform -rotate-3 text-3xl sm:text-5xl md:text-6xl mx-1 align-baseline drop-shadow-[0_2px_12px_rgba(244,63,94,0.45)]">
                कोई नहीं
              </span>{' '}
              <span className="relative inline-block bg-[#d8ff38] text-slate-950 px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl rotate-1 shadow-[4px_4px_0px_#e84393] sm:shadow-[5px_5px_0px_#e84393] border-2 border-slate-950 font-black tracking-normal">
                सिखाता।
              </span>
            </span>
          </h1>
        )}

        <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed">
          {currentLang === 'en' ? (
            <>
              Explore the world's{' '}
              <span className="text-white font-semibold underline decoration-[#38bdf8] decoration-2 underline-offset-4">
                slang
              </span>
              , <span className="text-[#f43f5e] font-semibold">insults</span> and{' '}
              <span className="text-[#d8ff38] font-bold">bad words</span> — before someone says one to you.
            </>
          ) : (
            t.heroSubheadline
          )}
        </p>

        {/* 3D Rotating Globe with Floating Chat Bubbles */}
        <div className="relative w-full max-w-[420px] sm:max-w-[480px] h-[340px] sm:h-[400px] my-3">
          <Globe3D
            countries={countries}
            interactive={true}
            autoRotate={true}
            showSpeechBubbles={true}
            className="w-full h-full"
            zoomLevel={0.95}
          />

          {/* Slogan Pill below globe */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/70 backdrop-blur-md border border-slate-700/60 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-[#d8ff38] uppercase shadow-lg">
            {t.samePlanetDifferentWords}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="w-full max-w-md mx-auto flex flex-col gap-3 mt-6 sm:mt-8">
          <button
            type="button"
            onClick={onGetStarted}
            className="w-full py-4 px-6 rounded-2xl bg-[#d8ff38] hover:bg-[#c9f228] text-slate-950 font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#d8ff38]/20 active:scale-[0.98] transition-all"
          >
            <span>{t.getStarted}</span>
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onExploreGlobe}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/70 active:scale-[0.98] transition-all"
          >
            {t.exploreGlobe}
          </button>
        </div>
      </main>

      {/* Bottom Footer Pill Tags */}
      <footer className="relative z-20 pb-6 pt-2 text-center">
        <div className="text-[11px] sm:text-xs font-semibold tracking-widest text-slate-500 uppercase">
          {t.taglinePills}
        </div>
      </footer>
    </div>
  );
};
