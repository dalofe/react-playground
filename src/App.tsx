import Counter from "./components/Counter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./components/TaskList";

export default function App() {
  const frontendTasks: Task[] = [
    { id: 1, title: "Migrate to React 18", completed: true },
    { id: 2, title: "Refactor components", completed: true },
  ];

  const backendTasks: Task[] = [
    { id: 1, title: "Set up Prisma", completed: false },
    { id: 2, title: "Implement API auth", completed: false },
  ];

  return (
    <div className="p-8 space-y-8">
      <Counter />
      <TaskForm onAddTask={(title) => console.log("New Task:", title)}/>
      <TaskList title="Frontend Team Tasks" initialTasks={frontendTasks} showCompleted={true} />
      <TaskList title="Backend Team Tasks" initialTasks={backendTasks} showCompleted={true} onTaskToggle={(task) => console.log("Task updated", task)} emptyMessage="No backend tasks"/>
    </div>
  );
}
