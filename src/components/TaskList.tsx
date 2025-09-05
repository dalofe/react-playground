import { useState, ChangeEvent, MouseEvent } from "react";

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Learn React", completed: true },
        { id: 2, title: "Learn TypeScript", completed: false },
    ]);
    const [inputValue, setInputValue] = useState<string>('');

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: number) => {
        const filteredTasksList = tasks.filter(task => task.id !== id);
        setTasks(filteredTasksList);
    }

    const addTask = () => {

    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleAddTask = (event: MouseEvent<HTMLButtonElement>) => {
        if (inputValue.trim() === '') {
            return; // Prevent adding empty items
        }

        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
            title: inputValue,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setInputValue('');

    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-md mt-6">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">Task List</h2>
                <div>
                    <input type="text" className="border-solid py-1" onChange={handleInputChange} value={inputValue} />
                    <button className="px-3 py-1 bg-green-500 rounded" onClick={handleAddTask}>+</button>
                </div>
            </div>
            <ul>
                {tasks.map(task => (
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
                ))}
            </ul>
        </div>
    );
}
