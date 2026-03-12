import { useState } from "react";
import type { Subtask } from "../../types/subtask";
import EditSubtaskForm from "./EditSubtaskForm";

type Props = {
  subtask: Subtask;
  onUpdateSubtask: (
    subtaskId: string,
    subtaskData: { title: string; description: string }
  ) => void;
  onToggleComplete: (subtaskId: string) => void;
  onDeleteSubtask: (subtaskId: string) => void;
};

export default function SubtaskItem({
  subtask,
  onUpdateSubtask,
  onToggleComplete,
  onDeleteSubtask,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li>
      {isEditing ? (
        <EditSubtaskForm
          subtask={subtask}
          onSave={subtaskData => {
            onUpdateSubtask(subtask.id, subtaskData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
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

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>

          <button type="button" onClick={() => onDeleteSubtask(subtask.id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}