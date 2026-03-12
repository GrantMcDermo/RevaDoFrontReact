import type { Task } from "../../types/task";

type Props = {
  tasks: Task[];
};

export default function TaskSummary({ tasks }: Props) {
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = tasks.length - completed;

  return (
    <>
      <h3>Task Summary</h3>
      <div className="summary-grid">
        <div className="summary-tile">
          <p className="summary-label">Total:</p>
          <p className="summary-value">{tasks.length}</p>
        </div>
        <div className="summary-tile">
          <p className="summary-label">Completed:</p>
          <p className="summary-value">{completed}</p>
        </div>
        <div className="summary-tile">
          <p className="summary-label">Remaining:</p>
          <p className="summary-value">{remaining}</p>
        </div>
      </div>
    </>
  );
}