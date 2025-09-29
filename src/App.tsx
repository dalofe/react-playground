import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./components/TaskList";

export default function App() {
  const loadStates = (key: string, fallback: Task[]): Task[] => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  };

  const [frontendTasks, setFrontendTasks] = useState<Task[]>(() => loadStates("frontendTasks", [
    { id: 1, title: "Migrate to React 18", completed: true },
    { id: 2, title: "Refactor components", completed: true },
  ]));

  useEffect(() => {
    localStorage.setItem("frontendTasks", JSON.stringify(frontendTasks));
  }, [frontendTasks]);


  const [backendTasks, setBackendTasks] = useState<Task[]>(() => loadStates("backendTasks", [
    { id: 1, title: "Set up Prisma", completed: false },
    { id: 2, title: "Implement API auth", completed: false },
  ]));

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
