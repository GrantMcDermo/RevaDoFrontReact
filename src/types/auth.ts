export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface RegisterResponse {
    id?: number;
    username: string;  
}

export interface AuthContextType {
    token: string;
    isAuthenticated: boolean;
    authLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}