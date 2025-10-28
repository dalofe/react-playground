import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import type { Task, TaskDraft } from './types/task';
import { TaskFilterBar } from './components/TaskFilterBar';

export default function App() {
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

  const [backendTasks, setBackendTasks] = useState<Task[]>(() =>
    loadStates('backendTasks', [
      { id: 1, title: 'Set up Prisma', completed: false },
      { id: 2, title: 'Implement API auth', completed: false },
    ])
  );

  useEffect(() => {
    localStorage.setItem('backendTasks', JSON.stringify(backendTasks));
  }, [backendTasks]);

  const handleAddFrotendTasks = (draft: TaskDraft) => {
    setFrontendTasks((prev) => [
      ...prev,
      { id: Date.now(), title: draft.title ?? '', completed: false },
    ]);
  };

  const handleAddBackendTasks = (draft: TaskDraft) => {
    setBackendTasks((prev) => [
      ...prev,
      { id: Date.now(), title: draft.title ?? '', completed: false },
    ]);
  };

  const totalTasks = frontendTasks.length + backendTasks.length;
  const totalCompleted =
    frontendTasks.filter((t) => t.completed).length +
    backendTasks.filter((t) => t.completed).length;

  return (
    <div className="p-8 space-y-8">
      <TaskFilterBar tasks={frontendTasks} setTasks={setFrontendTasks} />
      <TaskList
        title="Frontend Team Tasks"
        showCompleted={true}
        tasks={frontendTasks}
        setTasks={setFrontendTasks}
        emptyMessage="No frontend tasks"
        onAddTask={handleAddFrotendTasks}
      />
      <TaskFilterBar tasks={backendTasks} setTasks={setBackendTasks} />
      <TaskList
        title="Backend Team Tasks"
        showCompleted={true}
        tasks={backendTasks}
        setTasks={setBackendTasks}
        emptyMessage="No backend tasks"
        onAddTask={handleAddBackendTasks}
      />
      <div className="p-4 bg-gray-100 rounded-lg">
        Overall Progress: {totalCompleted}/{totalTasks} tasks done
      </div>
    </div>
  );
}
