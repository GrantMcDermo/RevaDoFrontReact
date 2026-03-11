import type { Subtask } from "./subtask";

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    subtasks?: Subtask[];
}

export interface TaskRequest {
    title: string;
    description: string;
}