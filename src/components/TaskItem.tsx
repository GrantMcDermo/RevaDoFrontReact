import type { Task } from "../types/task";
import { useState } from "react";
import SubtaskSection from "./tasks/SubtaskSection";
import EditTaskForm from "./tasks/EditTaskForm";

type TaskItemProps = {
    task: Task;
    onUpdateTask: (taskId: string, taskData: { title: string; description: string }) => void;
    onToggleTaskComplete: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
    onCreateSubtask: (taskId: string, subtaskData: { title: string; description: string }) => void;
    onUpdateSubtask: (subtaskId: string, subtaskData: { title: string; description: string }) => void;
    onToggleSubtaskComplete: (subtaskId: string) => void;
    onDeleteSubtask: (taskId: string, subtaskId: string) => void;
};

export default function TaskItem({
    task,
    onUpdateTask,
    onToggleTaskComplete,
    onDeleteTask,
    onCreateSubtask,
    onToggleSubtaskComplete,
    onDeleteSubtask,
}: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);

    function handleCreateSubtask(subtaskData: { title: string; description: string }) {
        onCreateSubtask(task.id, subtaskData);
    }

    function handleDeleteSubtask(subtaskId: string){
        onDeleteSubtask(task.id, subtaskId);
    }

    return (
        <div style={{ border: "1px solid black", padding: "10px", marginBottom: "1.5rem" }}>
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
        onToggleSubtaskComplete={onToggleSubtaskComplete}
        onDeleteSubtask={handleDeleteSubtask}
      />
        </div>
    );
}