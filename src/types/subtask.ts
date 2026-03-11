export interface Subtask {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export interface SubtaskRequest {
  title: string;
  description: string;
}