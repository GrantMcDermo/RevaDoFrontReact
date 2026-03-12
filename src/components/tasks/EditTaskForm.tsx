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
        <form className="app-form" onSubmit={handleSubmit}>
            <div className="app-form-row">
                <label>Edit Title</label>
                <input
                    className="app-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                />
            </div>
            <div className="app-form-row">
                <label>Edit Description</label>
                <textarea
                    className="app-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task description"
                />
            </div>
            <div className="inline-form-actions">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}