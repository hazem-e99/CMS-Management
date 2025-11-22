import { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../shared/lib/storage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return storage.get('theme', 'light');
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme
    root.classList.remove('light', 'dark');
    
    // Add current theme
    root.classList.add(theme);
    
    // Save to localStorage
    storage.set('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
