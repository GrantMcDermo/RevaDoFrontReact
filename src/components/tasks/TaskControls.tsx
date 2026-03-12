import CreateTaskForm from "./CreateTaskForm";
import TaskFilter from "./TaskFilter";

type Props = {
    filter: string;
    onFilterChange: (value: string) => void;
    onCreateTask: (taskData: { title: string; description: string }) => void;
};

export default function TaskControls({ filter, onFilterChange, onCreateTask }: Props) {
    return (
        <div>
            <TaskFilter filter={filter} onFilterChange={onFilterChange} />
            <CreateTaskForm onCreateTask={onCreateTask} />
        </div>
    );
}