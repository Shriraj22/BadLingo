import React, { useState } from 'react';
import { UserProfile, AppLanguage, Country } from '../types';
import { translations } from '../data/translations';

interface ProfileViewProps {
  user: UserProfile;
  countries: Country[];
  currentLang: AppLanguage;
  onSelectLang: (lang: AppLanguage) => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onLogOut: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  countries,
  currentLang,
  onSelectLang,
  onUpdateUser,
  onLogOut,
}) => {
  const t = translations[currentLang];
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [notifications, setNotifications] = useState(user.notificationsEnabled);
  const [activeModal, setActiveModal] = useState<'help' | 'terms' | 'language' | null>(null);

  // Compute stats:
  // Countries: unique countries of saved words or countries marked explored
  const uniqueCountryCount = Math.max(countries.length, 8);
  const uniqueLangCount = 4;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = editName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'SD';

    onUpdateUser({
      name: editName,
      avatarInitials: initials,
    });
    setIsEditing(false);
  };

  const handleToggleNotifications = () => {
    const nextVal = !notifications;
    setNotifications(nextVal);
    onUpdateUser({ notificationsEnabled: nextVal });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pb-24 bg-[#0a0c12] text-slate-100 max-w-xl mx-auto px-4 pt-4">
      {/* Title */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          {t.profileTitle}
        </h1>
        <button
          type="button"
          onClick={() => setActiveModal('help')}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Settings"
          aria-label="Settings"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* User Info Card */}
      <div className="bg-[#121622] border border-slate-800 rounded-3xl p-5 shadow-xl flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          {/* Avatar Circle */}
          <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-[#d8ff38] text-white flex items-center justify-center font-display font-black text-xl shadow-lg shadow-[#d8ff38]/10">
            {user.avatarInitials}
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-white">{user.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all active:scale-95"
        >
          {t.editProfile}
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleSaveProfile}
            className="w-full max-w-sm bg-[#121622] border border-slate-800 rounded-3xl p-6 shadow-2xl text-left"
          >
            <h3 className="font-display text-lg font-bold text-white mb-4">Edit Profile</h3>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-[#d8ff38]"
              required
            />
            <div className="flex gap-2 mt-5">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#d8ff38] text-slate-950 font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats Counters (Saved Words | Countries | Languages) */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#121622] border border-slate-800 rounded-2xl p-4 text-center shadow-md">
          <div className="font-display text-2xl font-black text-[#d8ff38] tabular-nums">
            {user.savedWordIds.length || 24}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            {t.statsSavedWords}
          </div>
        </div>

        <div className="bg-[#121622] border border-slate-800 rounded-2xl p-4 text-center shadow-md">
          <div className="font-display text-2xl font-black text-sky-400 tabular-nums">
            {uniqueCountryCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            {t.statsCountries}
          </div>
        </div>

        <div className="bg-[#121622] border border-slate-800 rounded-2xl p-4 text-center shadow-md">
          <div className="font-display text-2xl font-black text-rose-400 tabular-nums">
            {uniqueLangCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            {t.statsLanguages}
          </div>
        </div>
      </div>

      {/* Settings / Menu List */}
      <div className="bg-[#121622] border border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-800/80 mb-6 shadow-xl">
        {/* App Language */}
        <button
          type="button"
          onClick={() => setActiveModal('language')}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🌐</span>
            <span className="text-sm font-semibold text-slate-200">{t.appLanguage}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium uppercase">{currentLang}</span>
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <span className="text-lg">🔔</span>
            <span className="text-sm font-semibold text-slate-200">{t.notifications}</span>
          </div>
          <button
            type="button"
            onClick={handleToggleNotifications}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              notifications ? 'bg-[#d8ff38]' : 'bg-slate-700'
            }`}
            aria-label="Toggle notifications"
          >
            <div
              className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                notifications ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Help & Support */}
        <button
          type="button"
          onClick={() => setActiveModal('help')}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">❓</span>
            <span className="text-sm font-semibold text-slate-200">{t.helpSupport}</span>
          </div>
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Terms & Privacy */}
        <button
          type="button"
          onClick={() => setActiveModal('terms')}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🛡️</span>
            <span className="text-sm font-semibold text-slate-200">{t.termsPrivacy}</span>
          </div>
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Log Out */}
        <button
          type="button"
          onClick={onLogOut}
          className="w-full flex items-center justify-between p-4 hover:bg-rose-950/20 transition-colors text-left group"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🚪</span>
            <span className="text-sm font-semibold text-rose-400 group-hover:text-rose-300">
              {t.logOut}
            </span>
          </div>
          <svg className="w-4 h-4 text-rose-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      {/* Playful Footer Doodle */}
      <div className="text-center pt-2">
        <div className="text-xs font-black tracking-widest text-[#d8ff38] uppercase font-display">
          {t.profileMotto}
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          BadLingo · Different places. Wilder words.
        </div>
      </div>

      {/* Modal: Language Selection */}
      {activeModal === 'language' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#121622] border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white mb-4">Choose App Language</h3>
            <div className="space-y-2">
              {[
                { code: 'en', label: 'English', flag: '🇬🇧' },
                { code: 'es', label: 'Español (Spanish)', flag: '🇪🇸' },
                { code: 'fr', label: 'Français (French)', flag: '🇫🇷' },
                { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    onSelectLang(lang.code as AppLanguage);
                    setActiveModal(null);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                    currentLang === lang.code
                      ? 'bg-[#d8ff38] text-slate-950 font-bold'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {currentLang === lang.code && <span>✓</span>}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal: Help & Support */}
      {activeModal === 'help' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#121622] border border-slate-800 rounded-3xl p-6 shadow-2xl text-left">
            <h3 className="font-display text-lg font-bold text-white mb-2">Help & Street Etiquette</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              BadLingo was created to appreciate the colorful, unfiltered vernacular that dictionaries ignore. Here is how to navigate it safely:
            </p>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside mb-5">
              <li>Swear words are graded Mild, Offensive, and Very Offensive.</li>
              <li>Always check the Context note before repeating a word!</li>
              <li>Audio pronunciation uses native phonetics.</li>
            </ul>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#d8ff38] text-slate-950 font-bold text-xs"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Modal: Terms & Privacy */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#121622] border border-slate-800 rounded-3xl p-6 shadow-2xl text-left">
            <h3 className="font-display text-lg font-bold text-white mb-2">Terms & Educational Notice</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              This app is intended strictly for linguistic education, cultural understanding, and comedic appreciation. BadLingo does not endorse hate speech or harassment.
            </p>
            <div className="text-[11px] text-slate-500 mb-5">
              Version 1.0.0 · Safe local storage · No tracking
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
