import { useState, type SubmitEvent } from "react";
import type { Task } from "../../types/task";

type Props = {
    task: Task;
    onSave: (taskData: { title: string; description: string }) => void;
    onCancel: () => void;
};

export default function EditTaskForm({ task, onSave, onCancel }: Props) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description ?? "");

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (!title.trim()) {
            return;
        }
        onSave({ title: title.trim(), description: description.trim() });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}