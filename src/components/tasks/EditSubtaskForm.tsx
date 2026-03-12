import { useState } from "react";
import type { Subtask } from "../../types/subtask";

type Props = {
  subtask: Subtask;
  onSave: (subtaskData: { title: string; description: string }) => void;
  onCancel: () => void;
};

export default function EditSubtaskForm({
  subtask,
  onSave,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(subtask.title);
  const [description, setDescription] = useState(subtask.description ?? "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Subtask title"
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Subtask description"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}