import { useEffect, useState, type SubmitEvent } from "react";
import type { Task } from "../types/task";
import { createTask, deleteTask, getTasks, toggleTaskComplete, updateTask } from "../api/taskService";
import { createSubtask, deleteSubtask, toggleSubtaskComplete, updateSubtask } from "../api/subtaskService";
import type { Subtask } from "../types/subtask";
import TaskItem from "./TaskItem";

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");

    const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);
    const [editingSubtaskTitle, setEditingSubtaskTitle] = useState("");
    const [editingSubtaskDescription, setEditingSubtaskDescription] = useState("");

    const [newSubtaskTitle, setNewSubtaskTitle] = useState<Record<string, string>>({});
    const [newSubtaskDescription, setNewSubtaskDescription] = useState<Record<string, string>>({});

    async function loadAllTasks() {
        try {
            setError("");
            const data = await getTasks();
            setTasks(data);
        } catch {
            setError("Failed to load tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void loadAllTasks();
    }, []);

    async function handleCreateTask(e: SubmitEvent) {
        e.preventDefault();

        const title = newTitle.trim();
        if (!title) {
            setError("Title is required.");
            return;
        }

        try {
            await createTask({ title, description: newDescription });
            setNewTitle("");
            setNewDescription("");
            await loadAllTasks();
        } catch {
            setError("Failed to create task. Please try again.");
        }
    }

    function startEditingTask(task: Task) {
        setEditingTaskId(task.id);
        setEditingTitle(task.title);
        setEditingDescription(task.description);
    }

    function cancelEditingTask() {
        setEditingTaskId(null);
        setEditingTitle("");
        setEditingDescription("");
    }

    async function saveEditedTask(task: Task) {
        const title = editingTitle.trim();
        if (!title) {
            setError("Title is required.");
            return;
        }

        try {
            await updateTask(task.id, { title, description: editingDescription });
            cancelEditingTask();
            await loadAllTasks();
        } catch {
            setError("Failed to update task. Please try again.");
        }
    }

    async function handleToggleTaskComplete(task: Task) {
        try {
            await toggleTaskComplete(task.id);
            await loadAllTasks();
        } catch {
            setError("Failed to update task status. Please try again.");
        }
    }

    async function handleDeleteTask(id: string) {
        try {
            await deleteTask(id);
            await loadAllTasks();
        } catch {
            setError("Failed to delete task. Please try again.");
        }
    }

    async function handleCreateSubtask(task: Task) {
        const title = (newSubtaskTitle[task.id] ?? "").trim();
        const description = newSubtaskDescription[task.id] ?? "";

        if (!title) {
            setError("Subtask title is required.");
            return;
        }

        try {
            await createSubtask(task.id, { title, description });
            setNewSubtaskTitle((prev) => ({ ...prev, [task.id]: "" }));
            setNewSubtaskDescription((prev) => ({ ...prev, [task.id]: "" }));
            await loadAllTasks();
        } catch {
            setError("Failed to create subtask. Please try again.");
        }
    }

    function startEditingSubtask(subtask: Subtask) {
        setEditingSubtaskId(subtask.id);
        setEditingSubtaskTitle(subtask.title);
        setEditingSubtaskDescription(subtask.description);
    }

    function cancelEditingSubtask() {
        setEditingSubtaskId(null);
        setEditingSubtaskTitle("");
        setEditingSubtaskDescription("");
    }

    async function saveEditedSubtask(subtask: Subtask) {
        const title = editingSubtaskTitle.trim();
        if (!title) {
            setError("Subtask title is required.");
            return;
        }

        try {
            await updateSubtask(subtask.id, { title, description: editingSubtaskDescription });
            cancelEditingSubtask();
            await loadAllTasks();
        } catch {
            setError("Failed to update subtask. Please try again.");
        }
    }

    async function handleToggleSubtaskComplete(subtask: Subtask) {
        try {
            await toggleSubtaskComplete(subtask.id);
            await loadAllTasks();
        } catch {
            setError("Failed to update subtask status. Please try again.");
        }
    }

    async function handleDeleteSubtask(id: string) {
        try {
            await deleteSubtask(id);
            await loadAllTasks();
        } catch {
            setError("Failed to delete subtask. Please try again.");
        }
    }

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    return (
        <div>
            <h1>Task List</h1>

            <form onSubmit={handleCreateTask}>
                <div>
                    <label htmlFor="newTitle">Title:</label>
                    <input
                        id="newTitle"
                        value={newTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setNewTitle(e.target.value)
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newDescription">Description:</label>
                    <input
                        id="newDescription"
                        value={newDescription}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewDescription(e.target.value)
                        }
                    />
                </div>
                <button type="submit">Create Task</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <hr />

            {tasks.length === 0 ? (
                <p>No tasks found. Create one above!</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        editingTaskId={editingTaskId}
                        editingTitle={editingTitle}
                        editingDescription={editingDescription}
                        setEditingTitle={setEditingTitle}
                        setEditingDescription={setEditingDescription}
                        startEditingTask={startEditingTask}
                        cancelEditingTask={cancelEditingTask}
                        saveEditedTask={saveEditedTask}
                        handleToggleTaskComplete={handleToggleTaskComplete}
                        handleDeleteTask={handleDeleteTask}
                        editingSubtaskId={editingSubtaskId}
                        editingSubtaskTitle={editingSubtaskTitle}
                        editingSubtaskDescription={editingSubtaskDescription}
                        setEditingSubtaskTitle={setEditingSubtaskTitle}
                        setEditingSubtaskDescription={setEditingSubtaskDescription}
                        startEditingSubtask={startEditingSubtask}
                        cancelEditingSubtask={cancelEditingSubtask}
                        saveEditedSubtask={saveEditedSubtask}
                        handleToggleSubtaskComplete={handleToggleSubtaskComplete}
                        handleDeleteSubtask={handleDeleteSubtask}
                        newSubtaskTitle={newSubtaskTitle}
                        setNewSubtaskTitle={setNewSubtaskTitle}
                        newSubtaskDescription={newSubtaskDescription}
                        setNewSubtaskDescription={setNewSubtaskDescription}
                        handleCreateSubtask={handleCreateSubtask}
                    />
                ))
            )}
        </div>
    );
}

                        