import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      language: "Language",
      darkMode: "Dark Mode",
      football: "Football",
      basketball: "Basketball",
      americanFootball: "Am. Football",
      watchlist: "Watchlist",
      yourWatchedMatches: "Your Watched Matches",
      pastMatches: "Past Matches",
      todaysMatches: "Today's Matches",
      futureMatches: "Future Matches",
      noPastMatches: "No past matches watched.",
      noMatchesToday: "No matches watched today.",
      noFutureMatches: "No future matches watched.",
      home: "Home",
      settings: "Settings",
      settingsPageDescription: "Settings page",
      leagues: "Leagues",
      // Add more keys as needed
    }
  },
  hr: {
    translation: {
      language: "Jezik",
      darkMode: "Tamni Način",
      football: "Nogomet",
      basketball: "Košarka",
      americanFootball: "Am. Nogomet",
      watchlist: "Lista za gledanje",
      yourWatchedMatches: "Vaše gledane utakmice",
      pastMatches: "Prošle utakmice",
      todaysMatches: "Današnje utakmice",
      futureMatches: "Buduće utakmice",
      noPastMatches: "Nema prošlih gledanih utakmica.",
      noMatchesToday: "Nema današnjih gledanih utakmica.",
      noFutureMatches: "Nema budućih gledanih utakmica.",
      home: "Početna",
      settings: "Postavke",
      settingsPageDescription: "Stranica za postavke",
      leagues: "Lige",
      // Add more keys as needed
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
