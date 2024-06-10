import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';

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

export const SettingsContextProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState<boolean>(() => localStorage.getItem('theme') === 'dark' || false);
  const [language, setLanguage] = useState<string>(() => localStorage.getItem('language') || 'English');
  const [dateFormat, setDateFormat] = useState<string>(() => localStorage.getItem('dateFormat') || 'DD / MM / YYYY');
  const [initialPage, setInitialPage] = useState<string>(() => localStorage.getItem('initialPage') || 'Football');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('dateFormat', dateFormat);
  }, [dateFormat]);

  useEffect(() => {
    localStorage.setItem('initialPage', initialPage);
  }, [initialPage]);

  return (
    <SettingsContext.Provider value={{ isDark, setIsDark, language, setLanguage, dateFormat, setDateFormat, initialPage, setInitialPage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
