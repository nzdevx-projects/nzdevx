'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// ─── Create theme context with default values
const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: false,
});

/* ──────────────────────────────────────────────── Theme Provider Component */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [isDark, setIsDark] = useState(false);

  // ─── Handle theme changes and save to localStorage
  const handleTheme = (newTheme) => {
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isSystemDark);
      setTheme('system');
      setIsDark(isSystemDark);
    } else {
      localStorage.theme = newTheme;
      const willBeDark = newTheme === 'dark';
      document.documentElement.classList.toggle('dark', willBeDark);
      setTheme(newTheme);
      setIsDark(willBeDark);
    }
  };

  // ─── Toggle between light and dark themes
  const toggleTheme = () => {
    handleTheme(theme === 'light' ? 'dark' : 'light');
  };

  // ─── Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.theme;
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      const willBeDark = savedTheme === 'dark';
      document.documentElement.classList.toggle('dark', willBeDark);
      setIsDark(willBeDark);
    } else {
      // ─── Save system preference as concrete theme value
      const systemTheme = isSystemDark ? 'dark' : 'light';
      localStorage.theme = systemTheme;
      setTheme(systemTheme);
      document.documentElement.classList.toggle('dark', isSystemDark);
      setIsDark(isSystemDark);
    }

    // ─── Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!('theme' in localStorage) || localStorage.theme === 'system') {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        localStorage.theme = newSystemTheme;
        document.documentElement.classList.toggle('dark', e.matches);
        setTheme(newSystemTheme);
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook to access theme context
export const useThemeContext = () => useContext(ThemeContext);

/* ──────────────────────────────────────────────── Theme Toggle Button Component */
export function ThemeToggleButton() {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="bg-primary rounded-full w-12 3xl:w-13 6xl:w-14.5 p-[3px] 6xl:p-1
       ml-auto mr-1.5 lg:mx-0 lg:order-1"
    >
      <span
        className={`block size-[17px] 3xl:size-5 6xl:size-5.5 relative rounded-full transition-500
          ${
            isDark
              ? '6xl:left-[2px] shadow-[inset_5px_-4px_#ffffff] left-[1px] 3xl:shadow-[inset_6px_-4.5px_#ffffff] 6xl:shadow-[inset_6.5px_-5px_#ffffff]'
              : 'left-[25px] 6xl:left-[27px] shadow-[inset_20px_-20px_#f9d81a]'
          }`}
      ></span>
    </button>
  );
}
