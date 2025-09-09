import Counter from "./components/Counter";
import TaskList, { Task } from "./components/TaskList";

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
      <TaskList title="Frontend Team Tasks" initialTasks={frontendTasks} showCompleted={false} />
      <TaskList title="Backend Team Tasks" initialTasks={backendTasks} showCompleted={true} />
    </div>
  );
}
