import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import LoadingMessage from "../components/common/LoadingMessage";
import ErrorMessage from "../components/common/ErrorMessage";
import TaskPageHeader from "../components/tasks/TaskPageHeader";
import TaskControls from "../components/tasks/TaskControls";
import TaskSummary from "../components/tasks/TaskSummary";

export default function TaskPage() {
    const { username, logout } = useAuth();
    const { tasks, loading, error, createTask, updateTask, toggleTaskComplete, deleteTask, createSubtask, toggleSubtaskComplete, updateSubtask, deleteSubtask } = useTasks();
    const [filter, setFilter] = useState("all");

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "active") return !task.completed;
        return true;
    });

    return (
        <div>
            <TaskPageHeader username={username ?? "User"} onLogout={logout} />
            <TaskControls filter={filter} onFilterChange={setFilter} onCreateTask={createTask} />
            <TaskSummary tasks={tasks} />
            {loading && <LoadingMessage message="Loading tasks..." />}
            {error && <ErrorMessage message={error} />}
            <TaskList
                tasks={filteredTasks}
                onUpdateTask={updateTask}
                onToggleTaskComplete={toggleTaskComplete}
                onDeleteTask={deleteTask}
                onCreateSubtask={createSubtask}
                onToggleSubtaskComplete={toggleSubtaskComplete}
                onUpdateSubtask={updateSubtask}
                onDeleteSubtask={deleteSubtask}
            />
        </div>
    );
}