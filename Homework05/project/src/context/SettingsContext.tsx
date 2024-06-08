import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';

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
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('DD / MM / YYYY');
  const [initialPage, setInitialPage] = useState('Football');

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <SettingsContext.Provider value={{ isDark, setIsDark, language, setLanguage, dateFormat, setDateFormat, initialPage, setInitialPage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
