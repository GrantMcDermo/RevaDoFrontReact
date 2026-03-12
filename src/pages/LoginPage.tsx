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

    const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            setError(null);
            const data = await loginUser({ username, password });
            login(data.token, username);
            navigate("/tasks", { replace: true });
        } catch (err) {
            console.error("Login failed", err);
            setError("Login failed. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h2>Login</h2>
                <p className="auth-subtitle">Sign in!</p>
                <form className="app-form" onSubmit={handleSubmit}>
                    <div className="app-form-row">
                        <label htmlFor="username">Username</label>
                        <input id="username" className="app-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
                    </div>
                    <div className="app-form-row">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="app-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                {error && <p className="message message-error">{error}</p> }

                <p className="auth-footer">
                    Need an account? <Link to="/register">Register here.</Link>
                </p>
            </section>
        </main>
    );
}