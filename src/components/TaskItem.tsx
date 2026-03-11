import type React from "react";
import type { Task } from "../types/task";
import type { Subtask } from "../types/subtask";

interface TaskItemProps {
    task: Task;
    editingTaskId: string | null;
    editingTitle: string;
    editingDescription: string;
    setEditingTitle: React.Dispatch<React.SetStateAction<string>>;
    setEditingDescription: React.Dispatch<React.SetStateAction<string>>;
    startEditingTask: (task: Task) => void;
    cancelEditingTask: () => void;
    saveEditedTask: (task: Task) => void | Promise<void>;
    handleToggleTaskComplete: (task: Task) => void | Promise<void>;
    handleDeleteTask: (id: string) => void | Promise<void>;

    editingSubtaskId: string | null;
    editingSubtaskTitle: string;
    editingSubtaskDescription: string;
    setEditingSubtaskTitle: React.Dispatch<React.SetStateAction<string>>;
    setEditingSubtaskDescription: React.Dispatch<React.SetStateAction<string>>;
    startEditingSubtask: (subtask: Subtask) => void;
    cancelEditingSubtask: () => void;
    saveEditedSubtask: (subtask: Subtask) => void | Promise<void>;
    handleToggleSubtaskComplete: (subtask: Subtask) => void | Promise<void>;
    handleDeleteSubtask: (id: string) => void | Promise<void>;

    newSubtaskTitle: Record<string, string>;
    setNewSubtaskTitle: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    newSubtaskDescription: Record<string, string>;
    setNewSubtaskDescription: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    handleCreateSubtask: (task: Task) => void | Promise<void>;
}

export default function TaskItem({
    task,
    editingTaskId,
    editingTitle,
    editingDescription,
    setEditingTitle,
    setEditingDescription,
    startEditingTask,
    cancelEditingTask,
    saveEditedTask,
    handleToggleTaskComplete,
    handleDeleteTask,
    editingSubtaskId,
    editingSubtaskTitle,
    editingSubtaskDescription,
    setEditingSubtaskTitle,
    setEditingSubtaskDescription,
    startEditingSubtask,
    cancelEditingSubtask,
    saveEditedSubtask,
    handleToggleSubtaskComplete,
    handleDeleteSubtask,
    newSubtaskTitle,
    setNewSubtaskTitle,
    newSubtaskDescription,
    setNewSubtaskDescription,
    handleCreateSubtask,
}: TaskItemProps) {
    const isEditingTask = editingTaskId === task.id;

    return (
        <div style={{ border: "1px solid black", padding: "10px", marginBottom: "1.5rem" }}>
            {!isEditingTask ? (
                <div>
                    <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.title}
                    </h3>
                    <p>{task.description}</p>
                    <button onClick={() => handleToggleTaskComplete(task)}>
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button onClick={() => startEditingTask(task)}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    <h4>Subtasks:</h4>
                    {task.subtasks && task.subtasks.length > 0 ? (
                        <ul>
                            {task.subtasks.map((subtask) => {
                                const isEditingSubtask = editingSubtaskId === subtask.id;
                                return (
                                    <li key={subtask.id} style={{ marginBottom: "0.5rem" }}>
                                        {!isEditingSubtask ? (
                                            <div>
                                                <span style={{ textDecoration: subtask.completed ? "line-through" : "none" }}>
                                                    {subtask.title} - {subtask.description}
                                                </span>
                                                <button onClick={() => handleToggleSubtaskComplete(subtask)}>
                                                    {subtask.completed ? "Mark Incomplete" : "Mark Complete"}
                                                </button>
                                                <button onClick={() => startEditingSubtask(subtask)}>Edit</button>
                                                <button onClick={() => handleDeleteSubtask(subtask.id)}>Delete</button>
                                            </div>
                                        ) : (
                                            <div>
                                                <input
                                                    value={editingSubtaskTitle}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                        setEditingSubtaskTitle(e.target.value)
                                                    }
                                                    placeholder="Title"
                                                />
                                                <input
                                                    value={editingSubtaskDescription}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                        setEditingSubtaskDescription(e.target.value)
                                                    }
                                                    placeholder="Description"
                                                />
                                                <button onClick={() => void saveEditedSubtask(subtask)}>Save</button>
                                                <button onClick={cancelEditingSubtask}>Cancel</button>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No subtasks yet.</p>
                    )}
                    <div>
                        <input
                            placeholder="Subtask Title"
                            value={newSubtaskTitle[task.id] || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setNewSubtaskTitle((prev) => ({ ...prev, [task.id]: e.target.value }))
                            }
                        />
                        <input
                            placeholder="Subtask Description"
                            value={newSubtaskDescription[task.id] || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setNewSubtaskDescription((prev) => ({ ...prev, [task.id]: e.target.value }))
                            }
                        />
                        <button onClick={() => void handleCreateSubtask(task)}>Add Subtask</button>
                    </div>

                </div>
            ) : (
                <div>
                    <input
                        value={editingTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        value={editingDescription}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <button onClick={() => void saveEditedTask(task)}>Save</button>
                    <button onClick={cancelEditingTask}>Cancel</button>
                </div>

            )}
        </div>
    );
}