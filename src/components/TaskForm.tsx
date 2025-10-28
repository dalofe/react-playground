import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AlertBox } from "./AlertBox";
import type { TaskDraft } from "../types/task";

type TaskFormProps = {
    onAddTask: (task: TaskDraft) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [notification, setNotification] = useState("");
    const timeoutRef = useRef<number | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title.length === 0) {
            setErrorMessage("Task title cannot be empty");
        } else {
            setErrorMessage("");
            onAddTask({title});
            setTitle("");

            setNotification("Task added successfully!");
            if(timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => setNotification(""), 3000);
        }
    }

    return (
        <div>
            {errorMessage && (<span className="text-red-500 text-sm">{errorMessage}</span>)}
            {notification && <AlertBox message={notification} dismissible={true}/>}
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