import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./components/TaskList";

export default function App() {
  let initialFrontendTasks: Task[] = [
    { id: 1, title: "Migrate to React 18", completed: true },
    { id: 2, title: "Refactor components", completed: true },
  ];
  const frontendSavedTasks = localStorage.getItem("frontendTasks");
  initialFrontendTasks = frontendSavedTasks ? JSON.parse(frontendSavedTasks) : initialFrontendTasks;

  const [frontendTasks, setFrontendTasks] = useState<Task[]>(initialFrontendTasks);

  useEffect(() => {
    localStorage.setItem("frontendTasks", JSON.stringify(frontendTasks));
  }, [frontendTasks]);

  let initialBackendTasks: Task[] = [
    { id: 1, title: "Set up Prisma", completed: false },
    { id: 2, title: "Implement API auth", completed: false },
  ];
  const backendSavedTasks = localStorage.getItem("backendTasks");
  initialBackendTasks = backendSavedTasks ? JSON.parse(backendSavedTasks) : initialBackendTasks;

  const [backendTasks, setBackendTasks] = useState<Task[]>(initialBackendTasks);

  useEffect(() => {
    localStorage.setItem("backendTasks", JSON.stringify(backendTasks));
  }, [backendTasks]);

  const handleAddFrontendTask = (title: string) => {
    setFrontendTasks([...frontendTasks, { id: Date.now(), title, completed: false }]);
  }

  return (
    <div className="p-8 space-y-8">
      <Counter />
      <TaskForm onAddTask={handleAddFrontendTask} />
      <TaskList title="Frontend Team Tasks" showCompleted={true} tasks={frontendTasks} setTasks={setFrontendTasks} emptyMessage="No frontend tasks" />
      <TaskList title="Backend Team Tasks" showCompleted={true} tasks={backendTasks} setTasks={setBackendTasks} emptyMessage="No backend tasks" />
    </div>
  );
}
