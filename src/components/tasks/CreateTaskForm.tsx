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
        <form className="app-form" onSubmit={handleSubmit}>
            <div className="app-form-row">
                <label htmlFor="task-title">Title</label>
                <input
                    id="task-title"
                    className="app-input"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="app-form-row">
                <label htmlFor="task-description">Description</label>
                <textarea
                    id="task-description"
                    className="app-textarea"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="button-row">
                <button type="submit" className="btn btn-primary">
                    Create Task
                </button>
            </div>
        </form>
    );
}