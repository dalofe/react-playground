import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import type { Task, TaskDraft, SortOptions, FilterOptions } from './types/task';
import { TaskFilterBar } from './components/TaskFilterBar';
import DarkModeToggle from './components/DarkModeToggle';

export default function App() {
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

  const handleAddFrontendTasks = (draft: TaskDraft) => {
    setFrontendTasks((prev) => [
      ...prev,
      { id: Date.now(), title: draft.title ?? '', completed: false },
    ]);
  };

  return (
    <div
      className="transition-colors duration-300 min-h-screen bg-slate-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100"
    >
      <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-8">
        <DarkModeToggle />
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
          onAddTask={handleAddFrontendTasks}
        />
      </div>
    </div>
  );
}
