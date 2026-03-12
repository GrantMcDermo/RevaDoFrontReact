export type Subtask = {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
};

export type SubtaskRequest = {
  title: string;
  description: string;
};