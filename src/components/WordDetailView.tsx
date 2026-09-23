import React, { useState } from 'react';
import { WordItem, Country, Region, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { speakWord } from '../utils/speech';

interface WordDetailViewProps {
  word: WordItem;
  country: Country;
  region: Region;
  currentLang: AppLanguage;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onSelectWord: (word: WordItem) => void;
}

export const WordDetailView: React.FC<WordDetailViewProps> = ({
  word,
  country,
  region,
  currentLang,
  onBack,
  isSaved,
  onToggleSave,
  onSelectWord,
}) => {
  const t = translations[currentLang];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Find index of current word in region.words to calculate next & prev
  const currentIndex = region.words.findIndex((w) => w.id === word.id);
  const prevWord = currentIndex > 0 ? region.words[currentIndex - 1] : null;
  const nextWord = currentIndex < region.words.length - 1 ? region.words[currentIndex + 1] : null;

  const handlePlayAudio = async () => {
    setIsPlayingAudio(true);
    await speakWord(word.nativeWord, word.languageCode);
    setIsPlayingAudio(false);
  };

  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case 'Mild':
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/50 bg-emerald-950/40 text-emerald-400">
            {t.intensityMild}
          </span>
        );
      case 'Offensive':
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-amber-500/50 bg-amber-950/40 text-amber-400">
            {t.intensityOffensive}
          </span>
        );
      case 'Very Offensive':
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-rose-500/50 bg-rose-950/40 text-rose-400">
            {t.intensityVeryOffensive}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pb-24 bg-[#090b10] text-slate-100 max-w-xl mx-auto px-4 pt-3 animate-in fade-in duration-150">
      {/* Top Bar */}
      <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
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
          <span className="text-xs text-slate-400 font-semibold">
            {country.flag} {country.name} · {region.name}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleSave}
          className={`p-2 -mr-2 rounded-xl transition-colors ${
            isSaved ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'
          }`}
          aria-label="Save Word"
        >
          <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Main Word Header */}
      <div className="pt-6 pb-4">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
            {word.nativeWord}
          </h1>

          {/* Quick Audio Button */}
          <button
            type="button"
            onClick={handlePlayAudio}
            disabled={isPlayingAudio}
            className={`p-3 rounded-full border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-[#d8ff38] hover:border-[#d8ff38] transition-all active:scale-95 ${
              isPlayingAudio ? 'animate-pulse text-[#d8ff38] border-[#d8ff38]' : ''
            }`}
            title={t.readAloud}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-base text-slate-400 font-mono font-medium">
            {word.transliteration}
          </span>
          <span className="text-xs text-slate-600">·</span>
          <span className="text-xs text-slate-400 font-medium">
            {word.languageName}
          </span>
        </div>

        <div className="mt-4">
          {getIntensityBadge(word.intensity)}
        </div>
      </div>

      {/* Meaning Section */}
      <div className="mt-4 bg-[#121622] border border-slate-800/80 rounded-2xl p-5 shadow-lg">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          {t.meaning}
        </span>
        <div className="text-lg font-bold text-white mt-1">
          {word.meanings[currentLang]}
        </div>
      </div>

      {/* 2 Usage Examples */}
      <div className="mt-4 bg-[#121622] border border-slate-800/80 rounded-2xl p-5 shadow-lg space-y-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          {t.examples}
        </span>

        {word.examples.map((example, idx) => (
          <div key={idx} className="pb-3 border-b border-slate-800 last:border-0 last:pb-0">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-bold text-[#d8ff38]">{idx + 1}.</span>
              <div className="font-semibold text-sm sm:text-base text-slate-100">
                {example.native}
              </div>
            </div>
            {example.transliteration && (
              <div className="text-xs text-slate-400 pl-4 mt-0.5 font-mono">
                {example.transliteration}
              </div>
            )}
            <div className="text-xs sm:text-sm text-slate-300 pl-4 mt-1 italic">
              "{example.translations[currentLang]}"
            </div>
          </div>
        ))}
      </div>

      {/* Context / Cultural Note */}
      <div className="mt-4 bg-[#121622] border border-slate-800/80 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm">💡</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {t.context}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {word.contextNotes[currentLang]}
        </p>
      </div>

      {/* Dual Action Buttons (Save Word & Play Audio) */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onToggleSave}
          className={`py-3.5 px-4 rounded-2xl border font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all active:scale-95 ${
            isSaved
              ? 'bg-rose-500/20 border-rose-500 text-rose-400'
              : 'bg-[#141926] border-slate-700 hover:border-slate-500 text-slate-200'
          }`}
        >
          <svg className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span>{isSaved ? t.saved : t.saveWord}</span>
        </button>

        <button
          type="button"
          onClick={handlePlayAudio}
          disabled={isPlayingAudio}
          className="py-3.5 px-4 rounded-2xl bg-[#d8ff38] hover:bg-[#c9f228] text-slate-950 font-display font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#d8ff38]/20 transition-all active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{t.playAudio}</span>
        </button>
      </div>

      {/* Next / Previous Quick Word Navigation */}
      <div className="mt-5 pt-3 flex items-center justify-between gap-3">
        {prevWord ? (
          <button
            type="button"
            onClick={() => onSelectWord(prevWord)}
            className="flex-1 py-3 px-3 rounded-xl bg-[#121622] hover:bg-[#182032] border border-slate-800 text-left transition-all text-xs"
          >
            <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
              {t.prevWord}
            </span>
            <span className="font-bold text-slate-200 truncate block mt-0.5">
              ← {prevWord.nativeWord} ({prevWord.transliteration})
            </span>
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {nextWord ? (
          <button
            type="button"
            onClick={() => onSelectWord(nextWord)}
            className="flex-1 py-3 px-3 rounded-xl bg-[#121622] hover:bg-[#182032] border border-slate-800 text-right transition-all text-xs"
          >
            <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
              {t.nextWord}
            </span>
            <span className="font-bold text-slate-200 truncate block mt-0.5">
              {nextWord.nativeWord} ({nextWord.transliteration}) →
            </span>
          </button>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
};
