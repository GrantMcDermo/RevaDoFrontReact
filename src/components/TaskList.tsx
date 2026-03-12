import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

type Props = {
  tasks: Task[];
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

export default function TaskList({
  tasks,
  onUpdateTask,
  onToggleTaskComplete,
  onDeleteTask,
  onCreateSubtask,
  onUpdateSubtask,
  onToggleSubtaskComplete,
  onDeleteSubtask,
}: Props) {
  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onToggleTaskComplete={onToggleTaskComplete}
          onDeleteTask={onDeleteTask}
          onCreateSubtask={onCreateSubtask}
          onUpdateSubtask={onUpdateSubtask}
          onToggleSubtaskComplete={onToggleSubtaskComplete}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </div>
  );
}