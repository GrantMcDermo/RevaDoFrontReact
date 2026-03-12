import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";

export default function RegisterPage() {
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            await registerUser({ username, password });
            setSuccess("Registration successful. Please log in.");
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Registration failed", err);
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <p>
                Already have an account? <Link to="/login">Login here</Link>.
            </p>
        </div>
    );
}