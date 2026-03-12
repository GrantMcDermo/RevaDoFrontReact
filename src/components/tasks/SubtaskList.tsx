import type { Subtask } from "../../types/subtask";
import SubtaskItem from "./SubtaskItem";

type Props = {
  subtasks: Subtask[];
  onUpdateSubtask: (
    subtaskId: string,
    subtaskData: { title: string; description: string }
  ) => void;
  onToggleComplete: (subtaskId: string) => void;
  onDeleteSubtask: (subtaskId: string) => void;
};

export default function SubtaskList({
  subtasks,
  onUpdateSubtask,
  onToggleComplete,
  onDeleteSubtask,
}: Props) {
  if (subtasks.length === 0) {
    return <div className="empty-state">No subtasks yet.</div>;
  }

  return (
    <ul className="subtask-list">
      {subtasks.map((subtask) => (
        <SubtaskItem
          key={subtask.id}
          subtask={subtask}
          onUpdateSubtask={onUpdateSubtask}
          onToggleComplete={onToggleComplete}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </ul>
  );
}