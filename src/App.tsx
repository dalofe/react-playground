import Counter from "./components/Counter";

type Props = {
  name: string;
};

export default function App({ name }: Props) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Hello, {name}! 👋
      </h1>
      <Counter />
    </div>
  );
}
