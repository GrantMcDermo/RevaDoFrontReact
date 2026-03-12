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
    return <p>No subtasks yet.</p>;
  }

  return (
    <ul>
      {subtasks.map(subtask => (
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