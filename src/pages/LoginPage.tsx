import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authService";

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tasks", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const data = await loginUser({ username, password });
            login(data.token, username);
            navigate("/tasks", { replace: true });
        } catch (err) {
            console.error("Login failed:", err);
            setError("Login failed. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input name="username" value={username} onChange={e => setUsername(e.target.value)} />

                <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <p>
                Need an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
}