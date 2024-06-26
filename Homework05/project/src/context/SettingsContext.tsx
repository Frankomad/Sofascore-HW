import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';

interface ContextValue {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
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
      localStorage.setItem('dateFormat', dateFormat);
    }
  }, [dateFormat]);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('initialPage', initialPage);
    }
  }, [initialPage]);

  return (
    <SettingsContext.Provider value={{ isDark, setIsDark, dateFormat, setDateFormat, initialPage, setInitialPage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
