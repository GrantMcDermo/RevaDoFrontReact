import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(form.username, form.password);
            navigate("/tasks");
        } catch {
            setError("Login failed. Please check your credentials and try again.");
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
                        <input id="username" className="app-input" name="username" value={form.username} onChange={handleChange} />
                    </div>
                    <div className="app-form-row">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="app-input" name="password" type="password" value={form.password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
                {error ? <p className="message message-error">{error}</p> : null}

                <p className="auth-footer">
                    Need an account? <Link to="/register">Register here.</Link>
                </p>
            </section>
        </main>
    );
}