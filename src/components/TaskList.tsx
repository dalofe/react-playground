import { useState } from "react";
import type { ChangeEvent } from "react";

export type Task = {
    id: number;
    title: string;
    completed: boolean;
};

type TaskListProps = {
    title: string;
    initialTasks: Task[];
    showCompleted?: boolean;
    onTaskToggle?: (task: Task) => void;
    emptyMessage?: string;
}

export default function TaskList({ title, initialTasks, showCompleted = true, onTaskToggle, emptyMessage = "All done here" }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [inputValue, setInputValue] = useState<string>('');

    const toggleTask = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);

        const toggledTask = updatedTasks.find(task => task.id === id);
        if (toggledTask && onTaskToggle) {
            onTaskToggle(toggledTask);
        }
    };

    const deleteTask = (id: number) => {
        const filteredTasksList = tasks.filter(task => task.id !== id);
        setTasks(filteredTasksList);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleAddTask = () => {
        if (!inputValue.trim()) return;

        const newTask: Task = {
            id: Date.now(),
            title: inputValue,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setInputValue("");
    };


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleAddTask();
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-md mt-6">
            <div className="flex justify-between p-2">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add a new task"
                        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        value={inputValue}
                    />
                    <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={handleAddTask}
                    >
                        +
                    </button>
                </div>

            </div>
            <ul>
                {tasks.length === 0 ? emptyMessage :
                    tasks
                        //.filter(task => showCompleted ? true : !task.completed)
                        .filter(task => showCompleted || !task.completed)
                        .map(task => (
                            <li
                                key={task.id}
                                className={`flex justify-between items-center p-2 ${task.completed ? "line-through text-gray-400" : "text-gray-800"
                                    }`}
                            >
                                {task.title}
                                <div>
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className="px-3 py-1 mr-2 bg-green-500 text-white rounded"
                                    >
                                        {task.completed ? "Undo" : "Done"}
                                    </button>
                                    <button onClick={() => deleteTask(task.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded">x</button>
                                </div>
                            </li>
                        ))
                }
            </ul>
        </div>
    );
}
