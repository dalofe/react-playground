import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import type { Task, TaskDraft, SortOptions, FilterOptions } from './types/task';
import { TaskFilterBar } from './components/TaskFilterBar';

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

  const handleAddFrotendTasks = (draft: TaskDraft) => {
    setFrontendTasks((prev) => [
      ...prev,
      { id: Date.now(), title: draft.title ?? '', completed: false },
    ]);
  };

  return (
    <div className="p-8 space-y-8">
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
  );
}
