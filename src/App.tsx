import { useState } from "react";
import Counter from "./components/Counter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./components/TaskList";

export default function App() {

  const initialFrontendTasks: Task[] = [
    { id: 1, title: "Migrate to React 18", completed: true },
    { id: 2, title: "Refactor components", completed: true },
  ];

  const initialBackendTasks: Task[] = [
    { id: 1, title: "Set up Prisma", completed: false },
    { id: 2, title: "Implement API auth", completed: false },
  ];

  const handleAddFrontendTask = (title: string) => {
    setFrontendTasks([...frontendTasks, {id: Date.now(), title, completed: false}]);
  }

  const [frontendTasks, setFrontendTasks] = useState<Task[]>(initialFrontendTasks);
  const [backendTasks, setBackendTasks] = useState<Task[]>(initialBackendTasks);

  return (
    <div className="p-8 space-y-8">
      <Counter />
      <TaskForm onAddTask={handleAddFrontendTask} />
      <TaskList title="Frontend Team Tasks" showCompleted={true} tasks={frontendTasks} setTasks={setFrontendTasks} />
      <TaskList title="Backend Team Tasks" showCompleted={true} tasks={backendTasks} setTasks={setBackendTasks} onTaskToggle={(task) => console.log("Task updated", task)} emptyMessage="No backend tasks" />
    </div>
  );
}
