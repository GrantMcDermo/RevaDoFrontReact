import { useState, type SubmitEvent } from "react";

type Props = {
  onCreateSubtask: (subtaskData: { title: string; description: string }) => void;
};

export default function CreateSubtaskForm({ onCreateSubtask }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onCreateSubtask({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDescription("");
  }

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <div className="app-form-row">
        <label>Subtask Title</label>
        <input
          className="app-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Subtask title"
        />
      </div>
      <div className="app-form-row">
        <label>Subtask Description</label>
        <textarea
          className="app-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Subtask description"
        />
      </div>
      <div className="button-row">
        <button type="submit" className="btn btn-secondary">
          Add Subtask
        </button>
      </div>
    </form>
  );
}