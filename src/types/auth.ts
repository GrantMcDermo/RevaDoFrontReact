export type User = {
    id: string;
    username: string;
};

export type AuthRequest = {
    username: string;
    password: string;
};

export type RegisterRequest = {
    username: string;
    password: string;
};

export type AuthResponse = {
    token: string;
};

export type RegisterResponse = {
    id?: number;
    username: string;  
};

export type AuthContextType = {
    token: string | null;
    username: string | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
};
