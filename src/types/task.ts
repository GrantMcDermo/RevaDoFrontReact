import type { Subtask } from "./subtask";

export type Task = {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    subtasks: Subtask[];
};

export type TaskRequest = {
    title: string;
    description: string;
};