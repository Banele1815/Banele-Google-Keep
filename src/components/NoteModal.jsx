import { useEffect, useState } from "react";

function NoteModal({ isOpen, editingNote, onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(editingNote?.title ?? "");
      setText(editingNote?.text ?? "");
    }
  }, [editingNote, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onSave({ title, text });
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="modal-card">
        <h3 id="modalTitle">
          {editingNote ? "Edit note" : "Take a note"}
        </h3>

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

          <div className="modal-footer">
            <div className="note-tools"></div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-text"
                onClick={onClose}
              >
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