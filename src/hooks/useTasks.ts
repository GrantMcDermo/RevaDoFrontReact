import { useEffect, useState } from "react";
import type { Task, TaskRequest } from "../types/task";
import { createTaskRequest, getTasks, toggleTaskCompleteRequest, updateTaskRequest } from "../api/taskService";
import type { SubtaskRequest } from "../types/subtask";
import { createSubtaskRequest, toggleSubtaskCompleteRequest, updateSubtaskRequest, deleteSubtaskRequest } from "../api/subtaskService";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        void loadTasks();
    }, []);

    async function loadTasks() {
        try {
            setLoading(true);
            setError(null);
            // Fetch tasks from API and update state
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to load tasks:", error);
            setError("Failed to load tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function createTask(taskData: TaskRequest) {
        try {
            setError(null);
            const createdTask = await createTaskRequest(taskData);
            setTasks(prev => [...prev, createdTask]);
        } catch (error) {
            console.error("Failed to create task:", error);
            setError("Failed to create task.");
        }
    }

    async function updateTask(id: string, taskData: TaskRequest) {
        try {
            setError(null);
            const updatedTask = await updateTaskRequest(id, taskData);
            setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        } catch (error) {
            console.error("Failed to update task:", error);
            setError("Failed to update task.");
        }
    }

    async function toggleTaskComplete(id: string) {
        try {
            setError(null);
            const updatedTask = await toggleTaskCompleteRequest(id);
            setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        } catch (error) {
            console.error("Failed to toggle task completion:", error);
            setError("Failed to update task status.");
        }
    }

    async function deleteTask(id: string) {
        try {
            setError(null);
            await deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (error) {
            console.error("Failed to delete task:", error);
            setError("Failed to delete task.");
        }
    }

    async function createSubtask(taskId: string, subtaskData: SubtaskRequest) {
        try {
            setError(null);
            const createdSubtask = await createSubtaskRequest(taskId, subtaskData);
            setTasks(prev => prev.map(task => task.id === taskId ? { ...task, subtasks: [...task.subtasks, createdSubtask] } : task));
        } catch (error) {
            console.error("Failed to create subtask:", error);
            setError("Failed to create subtask.");
        }
    }

    async function updateSubtask(subtaskId: string, subtaskData: SubtaskRequest) {
        try {
            setError(null);
            const updatedSubtask = await updateSubtaskRequest(subtaskId, subtaskData);
            setTasks(prev => prev.map(task => ({
                ...task,
                subtasks: task.subtasks.map(subtask => subtask.id === updatedSubtask.id ? updatedSubtask : subtask)
            })));
        } catch (error) {
            console.error("Failed to update subtask:", error);
            setError("Failed to update subtask.");
        }
    }

    async function toggleSubtaskComplete(subtaskId: string) {
        try {
            setError(null);
            const updatedSubtask = await toggleSubtaskCompleteRequest(subtaskId);
            setTasks(prev => prev.map(task => {
                const containsSubtask = task.subtasks.some(subtask => subtask.id === updatedSubtask.id);
                if (!containsSubtask) return task;
                const updatedSubtasks = task.subtasks.map(subtask => subtask.id === updatedSubtask.id ? updatedSubtask : subtask);
                const allSubtasksComplete = updatedSubtasks.length > 0 && updatedSubtasks.every(subtask => subtask.completed);
                return {
                    ...task,
                    subtasks: updatedSubtasks,
                    completed: allSubtasksComplete ? true : task.completed
                };
            }));
        } catch (error) {
            console.error("Failed to toggle subtask completion:", error);
            setError("Failed to update subtask status.");
        }
    }

    async function deleteSubtask(taskId: string, subtaskId: string) {
        try {
            setError(null);
            await deleteSubtaskRequest(subtaskId);
            setTasks(prev => prev.map(task => task.id === taskId ? { ...task, subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId) } : task));
        } catch (error) {
            console.error("Failed to delete subtask:", error);
            setError("Failed to delete subtask.");
        }
    }

    return {
        tasks,
        loading,
        error,
        loadTasks,
        createTask,
        updateTask,
        toggleTaskComplete,
        deleteTask,
        createSubtask,
        updateSubtask,
        toggleSubtaskComplete,
        deleteSubtask
    };
}