import { useState, type ChangeEvent, type FormEvent } from "react"

type TaskFormProps = {
    onAddTask: (title: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
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
            setErrorMessage("");
            onAddTask(title);
            setTitle("");
        }
    }

    return (
        <div>
            {errorMessage && (<span className="text-red-500 text-sm">Add a task to submit!</span>)}
            <form onSubmit={handleSubmit}>
                <input type="text" className="border rounded px-2 py-1" value={title} onChange={handleInputChange} />
                <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
            </form>
        </div>
    )
}