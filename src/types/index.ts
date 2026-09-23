export type Intensity = 'Mild' | 'Offensive' | 'Very Offensive';

export type AppLanguage = 'en' | 'es' | 'fr' | 'hi';

export interface ExampleSentence {
  native: string;
  transliteration?: string;
  translations: Record<AppLanguage, string>;
}

export interface WordItem {
  id: string;
  nativeWord: string;
  transliteration: string;
  languageName: string;
  languageCode: string; // for TTS, e.g. 'mr-IN', 'hi-IN', 'fr-FR', 'ru-RU', 'ja-JP'
  intensity: Intensity;
  meanings: Record<AppLanguage, string>;
  examples: [ExampleSentence, ExampleSentence];
  contextNotes: Record<AppLanguage, string>;
  audioUrl?: string;
  culturalTips?: Record<AppLanguage, string>;
}

export interface Region {
  id: string;
  name: string;
  localLanguage: string;
  description: Record<AppLanguage, string>;
  words: WordItem[];
  bannerImage?: string;
}

export interface Country {
  id: string;
  name: string;
  code: string; // 2-letter ISO code
  flag: string;
  lat: number;
  lng: number;
  tagline: Record<AppLanguage, string>;
  overview: Record<AppLanguage, string>;
  cultureNotes: Record<AppLanguage, string>;
  censoredBubble: string;
  bannerImage: string;
  regions: Region[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarInitials: string;
  savedWordIds: string[];
  favoriteCountryIds: string[];
  exploredCountryIds: string[];
  notificationsEnabled: boolean;
}

export type ViewState =
  | 'landing'
  | 'auth'
  | 'globe'
  | 'country'
  | 'wordList'
  | 'wordDetail'
  | 'saved'
  | 'profile';
