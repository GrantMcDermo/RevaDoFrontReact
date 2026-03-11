import client from "./client";
import type { RegisterResponse, AuthRequest, AuthResponse } from "../types/auth";

export async function registerUser(data: AuthRequest): Promise<RegisterResponse> {
    const response = await client.post<RegisterResponse>("/user", data);
    return response.data;
}

export async function loginUser(data: AuthRequest): Promise<AuthResponse> {
    const response = await client.post<AuthResponse>("/login", data);
    return response.data;
}

export async function validateToken(): Promise<boolean> {
    const response = await client.post("/auth");
    return response.status === 202 || response.status === 200;
}