import type { Subtask } from "../../types/subtask";
import CreateSubtaskForm from "./CreateSubtaskForm";
import SubtaskList from "./SubtaskList";

type Props = {
  subtasks: Subtask[];
  onCreateSubtask: (subtaskData: { title: string; description: string }) => void;
  onToggleSubtaskComplete: (subtaskId: string) => void;
  onDeleteSubtask: (subtaskId: string) => void;
};

export default function SubtaskSection({
  subtasks,
  onCreateSubtask,
  onToggleSubtaskComplete,
  onDeleteSubtask,
}: Props) {
  return (
    <div>
      <CreateSubtaskForm onCreateSubtask={onCreateSubtask} />
      <SubtaskList
        subtasks={subtasks}
        onToggleComplete={onToggleSubtaskComplete}
        onDeleteSubtask={onDeleteSubtask}
      />
    </div>
  );
}