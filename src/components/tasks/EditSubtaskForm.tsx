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

  function handleSubmit(e: React.FormEvent) {
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
    <form className="app-form" onSubmit={handleSubmit}>
      <div className="app-form-row">
        <label>Edit Subtask Title</label>
        <input
          className="app-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Subtask title"
        />
      </div>
      <div className="app-form-row">
        <label>Edit Subtask Description</label>
        <textarea
          className="app-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Subtask description"
        />
      </div>
      <div className="inline-form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}