import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import type { Task, TaskDraft, SortOptions, FilterOptions } from './types/task';
import { TaskFilterBar } from './components/TaskFilterBar';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) {
        return stored === 'dark';
      }
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    }
    return false;
  });
  const [sort, setSort] = useState<SortOptions>('none');
  const [filter, setFilter] = useState<FilterOptions>('all');

  const loadStates = (key: string, fallback: Task[]): Task[] => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  };

  const [frontendTasks, setFrontendTasks] = useState<Task[]>(() =>
    loadStates('frontendTasks', [
      { id: 1, title: 'Migrate to React 18', completed: true },
      { id: 2, title: 'Refactor components', completed: true },
    ])
  );

  useEffect(() => {
    localStorage.setItem('frontendTasks', JSON.stringify(frontendTasks));
  }, [frontendTasks]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const visibleFrontendTasks = [...frontendTasks]
    .filter((t) =>
      filter === 'all'
        ? true
        : filter === 'completed'
          ? t.completed
          : !t.completed
    )
    .sort((a, b) => {
      if (sort === 'none') return 0;
      const direction = sort === 'desc' ? -1 : 1;
      return (
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }) *
        direction
      );
    });

  const handleAddFrotendTasks = (draft: TaskDraft) => {
    setFrontendTasks((prev) => [
      ...prev,
      { id: Date.now(), title: draft.title ?? '', completed: false },
    ]);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Task Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Manage your team tasks and track progress with ease.
            </p>
          </div>
          <button
            type="button"
            aria-pressed={isDarkMode}
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="self-start inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            <span
              className="h-2.5 w-2.5 rounded-full border border-slate-400 bg-slate-100 dark:border-slate-500 dark:bg-slate-600"
            ></span>
            {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          </button>
        </header>
        <TaskFilterBar
          sort={sort}
          onSortChange={setSort}
          tasks={frontendTasks}
          filter={filter}
          onFilterChange={setFilter}
          numberOfVisibleTasks={visibleFrontendTasks.length}
        />
        <TaskList
          title="Frontend Team Tasks"
          showCompleted={true}
          tasks={visibleFrontendTasks}
          setTasks={setFrontendTasks}
          emptyMessage="No frontend tasks"
          onAddTask={handleAddFrotendTasks}
        />
      </div>
    </div>
  );
}
