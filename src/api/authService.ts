import type { RegisterResponse, AuthRequest, AuthResponse } from "../types/auth";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export async function registerUser(data: AuthRequest) {
    const response = await axios.post<RegisterResponse>(`${BASE_URL}/user`, data);
    return response.data;
}

export async function loginUser(credentials: AuthRequest) {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/login`, credentials);
    return response.data;
}

export async function validateToken(token: string){
    await axios.post(`${BASE_URL}/auth`, null, { headers: { Authorization: `Bearer ${token}` } });
}