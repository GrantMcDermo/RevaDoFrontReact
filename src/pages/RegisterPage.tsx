import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            await registerUser({ username: form.username, password: form.password });
            navigate("/login", { replace: true, state: { message: "Registration successful. Please log in." } });
        } catch (err) {
            console.error("Registration failed", err);
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h2>Register</h2>
                <p className="auth-subtitle">Create your account!</p>
                <form className="app-form" onSubmit={handleSubmit}>
                    <div className="app-form-row">
                        <label htmlFor="username">Username</label>
                        <input id="username" className="app-input" value={form.username} onChange={handleChange} placeholder="Username" />
                    </div>
                    <div className="app-form-row">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="app-input" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                {error ? <p className="message message-error">{error}</p> : null}

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login here</Link>.
                </p>
            </section>
        </main>
    );
}