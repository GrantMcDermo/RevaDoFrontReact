import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType } from "../types/auth";
import { loginUser, validateToken } from "../api/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authLoading, setAuthLoading] = useState<boolean>(true);

    useEffect(() => {
        async function checkAuth() {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) {
                setIsAuthenticated(false);
                setAuthLoading(false);
                return;
            }

            try {
                const valid = await validateToken();
                setIsAuthenticated(valid);
            } catch {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            } finally {
                setAuthLoading(false);
            }
        }
        void checkAuth();
    }, []);

    async function login(username: string, password: string): Promise<void> {
        const data = await loginUser({ username, password });
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsAuthenticated(true);
    }

    function logout(): void {
        localStorage.removeItem("token");
        setToken("");
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, authLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}