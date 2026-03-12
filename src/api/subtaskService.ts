import axios from "axios";
import type { Subtask, SubtaskRequest } from "../types/subtask";

const BASE_URL = "http://localhost:8080/subtasks";

function getAuthHeaders() {
    const token = localStorage.getItem("revado_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function createSubtaskRequest(taskId: string, data: SubtaskRequest) {
    const response = await axios.post<Subtask>(`${BASE_URL}/task/${taskId}`, data, { headers: getAuthHeaders() });
    return response.data;
}

export async function updateSubtaskRequest(id: string, data: SubtaskRequest) {
    const response = await axios.put<Subtask>(`${BASE_URL}/${id}`, data, { headers: getAuthHeaders() });
    return response.data;
}

export async function deleteSubtaskRequest(id: string) {
    await axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
}

export async function toggleSubtaskCompleteRequest(id: string) {
    const response = await axios.patch<Subtask>(`${BASE_URL}/${id}/complete`, null, { headers: getAuthHeaders() });
    return response.data;
}