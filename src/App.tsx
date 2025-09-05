import Counter from "./components/Counter";
import TaskList from "./components/TaskList";

type Props = {
  name: string;
};

export default function App({ name }: Props) {
  return (
    <div className="p-8 space-y-8">
      <Counter />
      <TaskList />
    </div>
  );
}
