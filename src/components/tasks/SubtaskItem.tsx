import type { Subtask } from "../../types/subtask";

type Props = {
  subtask: Subtask;
  onToggleComplete: (subtaskId: string) => void;
  onDeleteSubtask: (subtaskId: string) => void;
};

export default function SubtaskItem({
  subtask,
  onToggleComplete,
  onDeleteSubtask,
}: Props) {
  return (
    <li>
      <div>
        <span
          style={{
            textDecoration: subtask.completed ? "line-through" : "none",
          }}
        >
          {subtask.title}
        </span>
        {subtask.description ? <p>{subtask.description}</p> : null}
      </div>

      <button type="button" onClick={() => onToggleComplete(subtask.id)}>
        {subtask.completed ? "Undo" : "Complete"}
      </button>

      <button type="button" onClick={() => onDeleteSubtask(subtask.id)}>
        Delete
      </button>
    </li>
  );
}