import { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { storage } from '../shared/lib/storage';

const LanguageContext = createContext();

const RTL_LANGUAGES = ['ar', 'ku'];

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = storage.get('language', 'en');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
    // Update document direction based on language
    const isRTL = RTL_LANGUAGES.includes(i18n.language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
    // Save to localStorage
    storage.set('language', i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const value = {
    language: i18n.language,
    changeLanguage,
    isRTL: RTL_LANGUAGES.includes(i18n.language),
    availableLanguages: ['en', 'ar', 'ku'],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
