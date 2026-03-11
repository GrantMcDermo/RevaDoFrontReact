import { useState, type ChangeEvent, type SubmitEvent } from "react";
import type { AuthRequest } from "../types/auth";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";

export default function RegisterPage() {
    const [form, setForm] = useState<AuthRequest>({ username: "", password: "" });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: SubmitEvent): Promise<void> {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const data = await registerUser(form);
            setSuccess(`User ${data.username} registered successfully!`);
            setTimeout(() => navigate("/login"), 1000);
        } catch {
            setError("Registration failed. Please try again.");
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <p>
                Already have an account? <Link to="/login">Login here</Link>.
            </p>
        </div>
    );
}