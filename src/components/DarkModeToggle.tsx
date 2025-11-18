import type { Dispatch, SetStateAction } from 'react';

type DarkModeToggleProps = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};
export default function DarkModeToggle({
  isDarkMode,
  setIsDarkMode,
}: DarkModeToggleProps) {
  return (
    <div>
      <button
        className="self-start inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-1 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-100
                  dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        onClick={() => setIsDarkMode((prev) => !prev)}
      >
        <span className="h-2.5 w-2.5 rounded-full border border-slate-400 bg-slate-100 dark:border-slate-500 dark:bg-slate-600"></span>
        Switch to {isDarkMode ? 'light ' : 'dark'} mode
      </button>
    </div>
  );
}

/*
 <button
  type="button"
  aria-pressed={isDarkMode}
  onClick={() => setIsDarkMode((prev) => !prev)}
  className="dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
>
  <span
    className="h-2.5 w-2.5 rounded-full border border-slate-400 bg-slate-100 dark:border-slate-500 dark:bg-slate-600"
  ></span>
  {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
</button>
*/
