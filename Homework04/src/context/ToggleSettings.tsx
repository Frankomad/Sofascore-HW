import React, { createContext, useContext, useEffect, useState } from 'react';

interface Theme {
  name: string;
  auto?: boolean;
}

interface SettingsContextInterface {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  showDetails: boolean;
  toggleShowDetails: () => void;
}

const SettingsContext = createContext<SettingsContextInterface>({
  theme: { name: 'auto', auto: true },
  setTheme: () => {},
  showDetails: false,
  toggleShowDetails: () => {},
});

export const useSettings = (): SettingsContextInterface => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : { name: 'auto', auto: true };
  });
  const [showDetails, setShowDetails] = useState<boolean>(() => {
    const storedShowDetails = localStorage.getItem('showDetails');
    return storedShowDetails ? JSON.parse(storedShowDetails) : false;
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  const toggleShowDetails = () => {
    setShowDetails((prevShowDetails) => {
      const newShowDetails = !prevShowDetails;
      localStorage.setItem('showDetails', JSON.stringify(newShowDetails));
      return newShowDetails;
    });
  };

  useEffect(() => {
    if (theme.name === 'auto') {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');

      if (darkModeQuery.matches) {
        setTheme({ name: 'dark', auto: true });
      } else if (lightModeQuery.matches) {
        setTheme({ name: 'light', auto: true });
      }
    }
  }, [theme]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, showDetails, toggleShowDetails }}>
      {children}
    </SettingsContext.Provider>
  );
};
