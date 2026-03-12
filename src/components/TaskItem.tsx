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
    <article className="card task-card">
      {isEditing ? (
        <EditTaskForm
          task={task}
          onSave={(taskData) => {
            onUpdateTask(task.id, taskData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="task-card-header">
            <div>
              <h3 className={`task-title ${task.completed ? "is-complete" : ""}`}>
                {task.title}
              </h3>

              {task.description ? <p className="task-description">{task.description}</p> : null}
            </div>

            <div className="button-row">
              <button type="button" className={`btn ${task.completed ? "btn-secondary" : "btn-success"}`} onClick={() => onToggleTaskComplete(task.id)}>
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(true)}>
                Edit
              </button>

              <button type="button" className="btn btn-danger" onClick={() => onDeleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
          <SubtaskSection
            subtasks={task.subtasks}
            onCreateSubtask={handleCreateSubtask}
            onUpdateSubtask={onUpdateSubtask}
            onToggleSubtaskComplete={onToggleSubtaskComplete}
            onDeleteSubtask={handleDeleteSubtask}
          />
        </>
      )}

      
    </article>
  );
}