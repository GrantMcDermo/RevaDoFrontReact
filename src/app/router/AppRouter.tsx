import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProtectedRoute from "../../auth/ProtectedRoute";
import TaskPage from "../../pages/TaskPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks" element={
                <ProtectedRoute>
                    <TaskPage />
                </ProtectedRoute>
            } />
        </Routes>
    );
}
