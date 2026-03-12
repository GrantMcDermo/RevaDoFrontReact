import type { Task } from "../../types/task";

type Props = {
  tasks: Task[];
};

export default function TaskSummary({ tasks }: Props) {
  const completed = tasks.filter(task => task.completed).length;
  const remaining = tasks.length - completed;

  return (
    <div>
      <p>Total: {tasks.length}</p>
      <p>Completed: {completed}</p>
      <p>Remaining: {remaining}</p>
    </div>
  );
}