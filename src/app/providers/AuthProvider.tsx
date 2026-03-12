import { useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { validateToken } from "../../api/authService";

type Props = {
    children: React.ReactNode;
};

const TOKEN_KEY = "revado_token";
const USERNAME_KEY = "revado_username";

export function AuthProvider({ children }: Props) {
    const [username, setUsername] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        async function restoreSession() {
            const storedToken = localStorage.getItem(TOKEN_KEY);
            const storedUsername = localStorage.getItem(USERNAME_KEY);

            if(!storedToken || !storedToken.trim()){
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USERNAME_KEY);
                setIsAuthLoading(false);
                return;
            }
            try {
                await validateToken(storedToken);
                setToken(storedToken);
                setUsername(storedUsername);
            } catch (error) {
                console.error("Token validation failed:", error);
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USERNAME_KEY);
                setToken(null);
                setUsername(null);
            } finally {
                setIsAuthLoading(false);
            }
        }
        void restoreSession();
    }, []);

    function login(token: string, username: string) {
        setToken(token);
        setUsername(username);

        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USERNAME_KEY, username);
    }

    function logout() {
        setToken(null);
        setUsername(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
    }

    const value = {
        token,
        username,
        isAuthenticated: !!token,
        isAuthLoading,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    ); 
}