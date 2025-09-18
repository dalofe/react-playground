import { useState, type ChangeEvent, type FormEvent } from "react"

type TaskFormProps = {
    onAddTask: (title: string) => void;
}

export default function TaskForm({onAddTask}: TaskFormProps) {
    const [title, setTitle] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleSubmitChange = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(title.length === 0){
            setErrorMessage(true);
        } else {
            setErrorMessage(false);
            onAddTask(title);
        }
    }

    return (
        <div>
            {errorMessage && (<span className="text-red-500 text-sm">Add a task to submit!</span>)}
            <form onSubmit={handleSubmitChange}>
                <input type="text" className="border rounded" value={title} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}