type Props = {
    filter: string;
    onFilterChange: (value: string) => void;
};

export default function TaskFilter({ filter, onFilterChange }: Props) {
    return (
        <div>
            <button type="button" onClick={() => onFilterChange("all")} disabled={filter === "all"}>
                All
            </button>
            <button type="button" onClick={() => onFilterChange("active")} disabled={filter === "active"}>
                Active 
            </button>
            <button type="button" onClick={() => onFilterChange("completed")} disabled={filter === "completed"}>
                Completed
            </button>
        </div>
    );
}