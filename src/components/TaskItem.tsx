import { useState } from "react";
import type { Task } from "../types/task";
import EditTaskForm from "./tasks/EditTaskForm";
import SubtaskSection from "./tasks/SubtaskSection";

type Props = {
  task: Task;
  onUpdateTask: (
    taskId: string,
    taskData: { title: string; description: string }
  ) => void;
  onToggleTaskComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onCreateSubtask: (
    taskId: string,
    subtaskData: { title: string; description: string }
  ) => void;
  onUpdateSubtask: (
    subtaskId: string,
    subtaskData: { title: string; description: string }
  ) => void;
  onToggleSubtaskComplete: (subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
};

export default function TaskItem({
  task,
  onUpdateTask,
  onToggleTaskComplete,
  onDeleteTask,
  onCreateSubtask,
  onUpdateSubtask,
  onToggleSubtaskComplete,
  onDeleteSubtask,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  function handleCreateSubtask(subtaskData: {
    title: string;
    description: string;
  }) {
    onCreateSubtask(task.id, subtaskData);
  }

  function handleDeleteSubtask(subtaskId: string) {
    onDeleteSubtask(task.id, subtaskId);
  }

  return (
    <div>
      {isEditing ? (
        <EditTaskForm
          task={task}
          onSave={taskData => {
            onUpdateTask(task.id, taskData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h3
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </h3>

          {task.description ? <p>{task.description}</p> : null}

          <button type="button" onClick={() => onToggleTaskComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>

          <button type="button" onClick={() => onDeleteTask(task.id)}>
            Delete
          </button>
        </>
      )}

      <SubtaskSection
        subtasks={task.subtasks}
        onCreateSubtask={handleCreateSubtask}
        onUpdateSubtask={onUpdateSubtask}
        onToggleSubtaskComplete={onToggleSubtaskComplete}
        onDeleteSubtask={handleDeleteSubtask}
      />
    </div>
  );
}