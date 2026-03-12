import axios from "axios";
import type { Task, TaskRequest } from "../types/task";

const BASE_URL = "http://localhost:8080/todo";

function getAuthHeaders() {
    const token = localStorage.getItem("revado_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getTasks() {
    const response = await axios.get<Task[]>(`${BASE_URL}`, { headers: getAuthHeaders() });
    return response.data;
}

export async function createTaskRequest(data: TaskRequest) {
    const response = await axios.post<Task>(`${BASE_URL}`, data, { headers: getAuthHeaders() });
    return response.data;
}

export async function updateTaskRequest(id: string, data: TaskRequest) {
    const response = await axios.put<Task>(`${BASE_URL}/${id}`, data, { headers: getAuthHeaders() });
    return response.data;
}

export async function deleteTask(id: string) {
    await axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
}

export async function toggleTaskCompleteRequest(id: string) {
    const response = await axios.patch<Task>(`${BASE_URL}/${id}/complete`, null, { headers: getAuthHeaders() });
    return response.data;
}