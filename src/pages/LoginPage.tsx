import { useState, type SubmitEvent } from "react";
import type { AuthRequest } from "../types/auth";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [form, setForm] = useState<AuthRequest>({ username: "", password: "" });
    const [error, setError] = useState<string>("");
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        setError("");
        try {
            await login(form.username, form.password);
            navigate("/home");
        } catch {
            setError("Login failed. Please check your credentials and try again.");
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input name="username" value={form.username} onChange={handleChange} />

                <input name="password" type="password" value={form.password}onChange={handleChange} />

                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <p>
                Need an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
}