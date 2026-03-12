import { useState, type SubmitEvent } from "react";

type Props = {
    onCreateTask: (taskData: { title: string; description: string }) => void;
};

export default function CreateTaskForm({ onCreateTask }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (!title.trim()) {
            return;
        }
        onCreateTask({ title: title.trim(), description: description.trim() });
        setTitle("");
        setDescription("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Task description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button type="submit">Create Task</button>
        </form>
    );
}