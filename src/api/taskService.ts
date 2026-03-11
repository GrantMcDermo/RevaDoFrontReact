import type { Task, TaskRequest } from "../types/task";
import client from "./client";

export async function getTasks(): Promise<Task[]> {
    const response = await client.get<Task[]>("/todo");
    return response.data;
}

export async function createTask(data: TaskRequest): Promise<Task> {
    const response = await client.post<Task>("/todo", data);
    return response.data;
}

export async function updateTask(id: string, data: TaskRequest): Promise<Task> {
    const response = await client.put<Task>(`/todo/${id}`, data);
    return response.data;
}

export async function deleteTask(id: string): Promise<void> {
    await client.delete(`/todo/${id}`);
}

export async function toggleTaskComplete(id: string): Promise<Task> {
    const response = await client.patch<Task>(`/todo/${id}/complete`);
    return response.data;
}