import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';
import i18n from '@/i18n';

interface ContextValue {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  dateFormat: string;
  setDateFormat: Dispatch<SetStateAction<string>>;
  initialPage: string;
  setInitialPage: Dispatch<SetStateAction<string>>;
}

const SettingsContext = createContext<ContextValue>({} as ContextValue);

const isLocalStorageAvailable = () => {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

export const SettingsContextProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [language, setLanguage] = useState<string>(() => {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem('language') || 'English';
    }
    return 'English';
  });
  const [dateFormat, setDateFormat] = useState<string>(() => {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem('dateFormat') || 'DD / MM / YYYY';
    }
    return 'DD / MM / YYYY';
  });
  const [initialPage, setInitialPage] = useState<string>(() => {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem('initialPage') || 'Football';
    }
    return 'Football';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('language', language);
      i18n.changeLanguage(language === 'English' ? 'en' : 'hr');
    }
  }, [language]);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('dateFormat', dateFormat);
    }
  }, [dateFormat]);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('initialPage', initialPage);
    }
  }, [initialPage]);

  return (
    <SettingsContext.Provider value={{ isDark, setIsDark, language, setLanguage, dateFormat, setDateFormat, initialPage, setInitialPage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
