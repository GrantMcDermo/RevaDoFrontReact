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
      <button type="submit">Add Subtask</button>
    </form>
  );
}