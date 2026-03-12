import CreateTaskForm from "./CreateTaskForm";
import TaskFilter from "./TaskFilter";

type Props = {
    filter: string;
    onFilterChange: (value: string) => void;
    onCreateTask: (taskData: { title: string; description: string }) => void;
};

export default function TaskControls({ filter, onFilterChange, onCreateTask }: Props) {
    return (
        <>
            <div>
                <h3>Filters</h3>
                <TaskFilter filter={filter} onFilterChange={onFilterChange} />
            </div>
            <div style={{ marginTop: "18px"}}>
                <h3>Create Task</h3>
                <CreateTaskForm onCreateTask={onCreateTask} />
            </div>
        </>
    );
}