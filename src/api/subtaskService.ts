import type { Subtask, SubtaskRequest } from "../types/subtask";
import client from "./client";

export async function createSubtask(taskId: string, data: SubtaskRequest): Promise<Subtask> {
    const response = await client.post<Subtask>(`/subtasks/task/${taskId}`, data);
    return response.data;
}

export async function updateSubtask(id: string, data: SubtaskRequest): Promise<Subtask> {
    const response = await client.put<Subtask>(`/subtasks/${id}`, data);
    return response.data;
}

export async function deleteSubtask(id: string): Promise<void> {
    await client.delete(`/subtasks/${id}`);
}

export async function toggleSubtaskComplete(id: string): Promise<Subtask> {
    const response = await client.patch<Subtask>(`/subtasks/${id}/complete`);
    return response.data;
}