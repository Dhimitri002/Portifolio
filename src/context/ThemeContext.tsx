import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'dark-anime' | 'cyber-blue' | 'ethereal-purple' | 'flora-nature' | 'abyss-black' | 'solar-flare';
export type BackgroundPattern = 'none' | 'grid' | 'dots' | 'scanlines';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  pattern: BackgroundPattern;
  setPattern: (pattern: BackgroundPattern) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark-anime');
  const [pattern, setPatternState] = useState<BackgroundPattern>('none');

  useEffect(() => {
    const savedTheme = localStorage.getItem('haru_theme') as Theme;
    const savedPattern = localStorage.getItem('haru_pattern') as BackgroundPattern;
    
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    if (savedPattern) {
      setPatternState(savedPattern);
      document.documentElement.setAttribute('data-pattern', savedPattern);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('haru_theme', newTheme);
    if (newTheme === 'dark-anime') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const setPattern = (newPattern: BackgroundPattern) => {
    setPatternState(newPattern);
    localStorage.setItem('haru_pattern', newPattern);
    if (newPattern === 'none') {
      document.documentElement.removeAttribute('data-pattern');
    } else {
      document.documentElement.setAttribute('data-pattern', newPattern);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, pattern, setPattern }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
