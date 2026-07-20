import { useEffect, useState } from "react";

const COLORS = [
  { value: "default", label: "Default" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "pink", label: "Pink" },
  { value: "purple", label: "Purple" },
];

function toDateTimeLocal(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const timezoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

function NoteModal({ isOpen, editingNote, onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("default");
  const [tagsText, setTagsText] = useState("");
  const [reminderAt, setReminderAt] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setTitle(editingNote?.title ?? "");
    setText(editingNote?.text ?? "");
    setColor(editingNote?.color ?? "default");
    setTagsText(Array.isArray(editingNote?.tags) ? editingNote.tags.join(", ") : "");
    setReminderAt(toDateTimeLocal(editingNote?.reminderAt));
  }, [editingNote, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    onSave({ title, text, color, tags, reminderAt });
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={handleBackdropClick}
    >
      <div className="modal-card">
        <h3 id="modalTitle">{editingNote ? "Edit note" : "Take a note"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            id="noteTitle"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            maxLength={100}
            autoFocus
          />

          <textarea
            id="noteText"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Write something..."
            maxLength={2000}
          />

          <fieldset className="color-picker">
            <legend>Note colour</legend>
            <div className="color-options">
              {COLORS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`color-swatch color-swatch-${option.value} ${
                    color === option.value ? "selected" : ""
                  }`}
                  aria-label={`${option.label} note colour`}
                  aria-pressed={color === option.value}
                  title={option.label}
                  onClick={() => setColor(option.value)}
                />
              ))}
            </div>
          </fieldset>

          <label className="form-field" htmlFor="noteTags">
            <span>Category tags</span>
            <input
              id="noteTags"
              type="text"
              value={tagsText}
              onChange={(event) => setTagsText(event.target.value)}
              placeholder="work, ideas, personal"
              maxLength={120}
            />
            <small>Separate tags with commas. Maximum five tags.</small>
          </label>

          <label className="form-field" htmlFor="noteReminder">
            <span>Reminder</span>
            <div className="reminder-input-row">
              <input
                id="noteReminder"
                type="datetime-local"
                value={reminderAt}
                onChange={(event) => setReminderAt(event.target.value)}
              />
              {reminderAt && (
                <button
                  type="button"
                  className="btn-text remove-reminder"
                  onClick={() => setReminderAt("")}
                >
                  Remove
                </button>
              )}
            </div>
          </label>

          <div className="modal-footer">
            <p className="modal-hint">
              {editingNote ? "Update your note" : "Create a new note"}
            </p>
            <div className="modal-actions">
              <button type="button" className="btn-text" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn-save">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
