/**
 * BadLingo - Interactive World Slang & Insults Learning Application
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { countriesData } from './data/countriesData';
import { Country, Region, WordItem, AppLanguage, ViewState, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './components/LandingPage';
import { AuthView } from './components/AuthView';
import { ExploreGlobeView } from './components/ExploreGlobeView';
import { CountryRegionView } from './components/CountryRegionView';
import { WordListView } from './components/WordListView';
import { WordDetailView } from './components/WordDetailView';
import { SavedWordsView } from './components/SavedWordsView';
import { ProfileView } from './components/ProfileView';
import { SurpriseMeModal } from './components/SurpriseMeModal';

const INITIAL_USER: UserProfile = {
  name: 'Shriraj Deshmukh',
  email: 'shriraj.deshmukh2027@mastersunion.org',
  avatarInitials: 'SD',
  savedWordIds: [
    'in-mh-1', // chutya
    'in-dl-1', // bhenchod
    'ru-mos-1', // blyat
    'fr-par-1', // putain
    'jp-tok-1', // baka
    'uk-lon-1', // bloody
    'es-mad-1', // joder
    'br-rio-1', // caralho
  ],
  favoriteCountryIds: ['india', 'russia', 'japan'],
  exploredCountryIds: ['india', 'russia', 'japan'],
  notificationsEnabled: true,
};

export default function App() {
  const [countries] = useState<Country[]>(countriesData);
  const [currentLang, setCurrentLang] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('badlingo_lang');
    return (saved as AppLanguage) || 'en';
  });

  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries[0] || null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(
    countries[0]?.regions[0] || null
  );
  const [selectedWord, setSelectedWord] = useState<WordItem | null>(null);

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('badlingo_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState(false);

  // Sync language changes
  const handleSelectLang = (lang: AppLanguage) => {
    setCurrentLang(lang);
    localStorage.setItem('badlingo_lang', lang);
  };

  // Sync user profile changes
  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('badlingo_user', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Toggle saved word bookmark
  const handleToggleSaveWord = (wordId: string) => {
    setUser((prev) => {
      const exists = prev.savedWordIds.includes(wordId);
      const nextIds = exists
        ? prev.savedWordIds.filter((id) => id !== wordId)
        : [...prev.savedWordIds, wordId];
      const nextUser = { ...prev, savedWordIds: nextIds };
      try {
        localStorage.setItem('badlingo_user', JSON.stringify(nextUser));
      } catch {
        // ignore
      }
      return nextUser;
    });
  };

  // Toggle favorite country
  const handleToggleFavoriteCountry = (countryId: string) => {
    setUser((prev) => {
      const exists = prev.favoriteCountryIds.includes(countryId);
      const nextIds = exists
        ? prev.favoriteCountryIds.filter((id) => id !== countryId)
        : [...prev.favoriteCountryIds, countryId];
      const nextUser = { ...prev, favoriteCountryIds: nextIds };
      try {
        localStorage.setItem('badlingo_user', JSON.stringify(nextUser));
      } catch {
        // ignore
      }
      return nextUser;
    });
  };

  // Navigation handlers
  const handleSelectCountryFromGlobe = (country: Country) => {
    setSelectedCountry(country);
    setSelectedRegion(country.regions[0] || null);
    setCurrentView('country');
  };

  const handleSelectRegion = (region: Region) => {
    setSelectedRegion(region);
    setCurrentView('wordList');
  };

  const handleSelectWord = (word: WordItem) => {
    setSelectedWord(word);
    setCurrentView('wordDetail');
  };

  const handleSurpriseExplore = (country: Country, region: Region, word?: WordItem) => {
    setSelectedCountry(country);
    setSelectedRegion(region);
    if (word) {
      setSelectedWord(word);
      setCurrentView('wordDetail');
    } else {
      setCurrentView('wordList');
    }
  };

  const handleAuthSuccess = (updatedUser: Partial<UserProfile>) => {
    handleUpdateUser(updatedUser);
    setCurrentView('globe');
  };

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-[#d8ff38] selection:text-slate-950">
      {/* 1. Landing Page View */}
      {currentView === 'landing' && (
        <LandingPage
          countries={countries}
          currentLang={currentLang}
          onSelectLang={handleSelectLang}
          onGetStarted={() => {
            setAuthMode('signup');
            setCurrentView('auth');
          }}
          onExploreGlobe={() => setCurrentView('globe')}
        />
      )}

      {/* 2. Authentication View (Sign Up / Login) */}
      {currentView === 'auth' && (
        <AuthView
          currentLang={currentLang}
          initialMode={authMode}
          onSuccess={handleAuthSuccess}
          onBack={() => setCurrentView('landing')}
        />
      )}

      {/* 3. Main App Views (with Navbar & BottomNav) */}
      {currentView !== 'landing' && currentView !== 'auth' && (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
            currentLang={currentLang}
            onSelectLang={handleSelectLang}
            user={user}
          />

          <main className="flex-1">
            {/* Globe View */}
            {currentView === 'globe' && (
              <ExploreGlobeView
                countries={countries}
                currentLang={currentLang}
                onSelectCountry={handleSelectCountryFromGlobe}
                onOpenSurpriseMe={() => setIsSurpriseModalOpen(true)}
              />
            )}

            {/* Country / Region Selection View */}
            {currentView === 'country' && selectedCountry && (
              <CountryRegionView
                country={selectedCountry}
                currentLang={currentLang}
                onBack={() => setCurrentView('globe')}
                onSelectRegion={handleSelectRegion}
                isFavorite={user.favoriteCountryIds.includes(selectedCountry.id)}
                onToggleFavorite={() => handleToggleFavoriteCountry(selectedCountry.id)}
              />
            )}

            {/* Word List View */}
            {currentView === 'wordList' && selectedCountry && selectedRegion && (
              <WordListView
                country={selectedCountry}
                region={selectedRegion}
                currentLang={currentLang}
                onBack={() => setCurrentView('country')}
                onSelectWord={handleSelectWord}
                onSurpriseMe={() => setIsSurpriseModalOpen(true)}
                isFavorite={user.favoriteCountryIds.includes(selectedCountry.id)}
                onToggleFavorite={() => handleToggleFavoriteCountry(selectedCountry.id)}
                savedWordIds={user.savedWordIds}
              />
            )}

            {/* Word Detail View */}
            {currentView === 'wordDetail' && selectedCountry && selectedRegion && selectedWord && (
              <WordDetailView
                word={selectedWord}
                country={selectedCountry}
                region={selectedRegion}
                currentLang={currentLang}
                onBack={() => setCurrentView('wordList')}
                isSaved={user.savedWordIds.includes(selectedWord.id)}
                onToggleSave={() => handleToggleSaveWord(selectedWord.id)}
                onSelectWord={handleSelectWord}
              />
            )}

            {/* Saved Words View */}
            {currentView === 'saved' && (
              <SavedWordsView
                countries={countries}
                savedWordIds={user.savedWordIds}
                currentLang={currentLang}
                onSelectWord={(c, r, w) => {
                  setSelectedCountry(c);
                  setSelectedRegion(r);
                  setSelectedWord(w);
                  setCurrentView('wordDetail');
                }}
                onRemoveSaved={(id) => handleToggleSaveWord(id)}
                onStartExploring={() => setCurrentView('globe')}
              />
            )}

            {/* Profile View */}
            {currentView === 'profile' && (
              <ProfileView
                user={user}
                countries={countries}
                currentLang={currentLang}
                onSelectLang={handleSelectLang}
                onUpdateUser={handleUpdateUser}
                onLogOut={() => setCurrentView('landing')}
              />
            )}
          </main>

          {/* Bottom Nav for Mobile Screens */}
          <BottomNav
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
            currentLang={currentLang}
            savedCount={user.savedWordIds.length}
          />
        </>
      )}

      {/* Global Surprise Me Modal */}
      <SurpriseMeModal
        isOpen={isSurpriseModalOpen}
        onClose={() => setIsSurpriseModalOpen(false)}
        countries={countries}
        currentLang={currentLang}
        onExploreCountry={handleSurpriseExplore}
      />
    </div>
  );
}
