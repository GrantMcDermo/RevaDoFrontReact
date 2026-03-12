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
    <li className="subtask-item">
      {isEditing ? (
        <EditSubtaskForm
          subtask={subtask}
          onSave={(subtaskData) => {
            onUpdateSubtask(subtask.id, subtaskData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="subtask-main">
          <div>
            <p className={`subtask-title ${subtask.completed ? "is-complete" : ""}`}>
              {subtask.title}
            </p>

            {subtask.description ? (<p className="subtask-description">{subtask.description}</p>) : null}
          </div>

          <div className="button-row">
            <button type="button" className={`btn ${subtask.completed ? "btn-secondary" : "btn-success"}`} onClick={() => onToggleComplete(subtask.id)}>
              {subtask.completed ? "Undo" : "Complete"}
            </button>

            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button type="button" className="btn btn-danger" onClick={() => onDeleteSubtask(subtask.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}