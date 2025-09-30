import { useState } from "react";
import type { ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react"
import type { Task } from "./TaskList";

type TaskFormProps = {
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

export default function TaskForm({ setTasks }: TaskFormProps) {
    const [title, setTitle] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title.length === 0) {
            setErrorMessage("Task title cannot be empty");
        } else {
            const newTask: Task = {
                id: Date.now(),
                title,
                completed: false,
            };

            setErrorMessage("");
            //setTasks([...tasks, newTask]);
            setTasks(prev => [...prev, newTask]);
            setTitle("");
        }
    }

    return (
        <div>
            {errorMessage && (<span className="text-red-500 text-sm">{errorMessage}</span>)}
            <form className="flex gap-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add a new task"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={handleInputChange} />
                <button
                    type="submit"
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >+</button>
            </form>
        </div>
    )
}