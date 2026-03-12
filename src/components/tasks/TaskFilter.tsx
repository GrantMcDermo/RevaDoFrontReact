type Props = {
    filter: string;
    onFilterChange: (value: string) => void;
};

export default function TaskFilter({ filter, onFilterChange }: Props) {
    return (
        <div className="filter-row">
            <button type="button" onClick={() => onFilterChange("all")} className={`btn ${filter === "all" ? "btn-primary" : "btn-secondary"}`} >
                All
            </button>
            <button type="button" onClick={() => onFilterChange("active")} className={`btn ${filter === "active" ? "btn-primary" : "btn-secondary"}`} >
                Active 
            </button>
            <button type="button" onClick={() => onFilterChange("completed")} className={`btn ${filter === "completed" ? "btn-primary" : "btn-secondary"}`} >
                Completed
            </button>
        </div>
    );
}