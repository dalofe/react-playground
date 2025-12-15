import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('theme');
          if (stored) {
            return stored === 'dark';
          }
          return (
            window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
          );
        }
        return false;
      });
    
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return [isDarkMode, setIsDarkMode] as const;
};