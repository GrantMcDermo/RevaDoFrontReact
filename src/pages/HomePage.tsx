import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import TaskList from "../components/TaskList";

export default function HomePage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div>
            <h1>RevaDo!</h1>
            <button onClick={handleLogout}>Logout</button>
            <TaskList />
        </div>
    );
}