const VALID_COLORS = new Set([
  "default",
  "yellow",
  "green",
  "blue",
  "pink",
  "purple",
]);

const reminderFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function NoteCard({
  note,
  currentView,
  onEdit,
  onDelete,
  onArchive,
  onRestore,
  onDeleteForever,
  onTogglePin,
  onTagSelect,
}) {
  const color = VALID_COLORS.has(note.color) ? note.color : "default";
  const tags = Array.isArray(note.tags) ? note.tags : [];
  const reminderDate = note.reminderAt ? new Date(note.reminderAt) : null;
  const hasValidReminder =
    reminderDate && !Number.isNaN(reminderDate.getTime());
  const isOverdue = hasValidReminder && reminderDate.getTime() < Date.now();

  return (
    <article className={`note-card note-color-${color}`}>
      <div className="note-card-content">
        {note.pinned && (
          <span className="pinned-badge" aria-label="Pinned note">
            📌 Pinned
          </span>
        )}

        {note.title && <h3 className="note-title">{note.title}</h3>}
        {note.text && <p className="note-text">{note.text}</p>}

        {tags.length > 0 && (
          <div className="note-tags" aria-label="Note categories">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="tag-chip"
                onClick={() => onTagSelect(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {hasValidReminder && (
          <p className={`reminder-chip ${isOverdue ? "overdue" : ""}`}>
            <span aria-hidden="true">⏰</span>
            <span>{reminderFormatter.format(reminderDate)}</span>
            {isOverdue && <strong>Overdue</strong>}
          </p>
        )}
      </div>

      <div className="note-actions">
        {currentView === "bin" ? (
          <>
            <button
              type="button"
              className="note-action-btn"
              title="Restore"
              aria-label="Restore note"
              onClick={() => onRestore(note.id)}
            >
              <img src="/assets/restore-icon.png" alt="" />
            </button>
            <button
              type="button"
              className="note-action-btn"
              title="Delete forever"
              aria-label="Delete note forever"
              onClick={() => onDeleteForever(note.id)}
            >
              <img src="/assets/bin-icon.png" alt="" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`note-action-btn pin-button ${note.pinned ? "active" : ""}`}
              title={note.pinned ? "Unpin" : "Pin"}
              aria-label={note.pinned ? "Unpin note" : "Pin note"}
              aria-pressed={Boolean(note.pinned)}
              onClick={() => onTogglePin(note.id)}
            >
              <span aria-hidden="true">📌</span>
            </button>
            <button
              type="button"
              className="note-action-btn"
              title="Edit"
              aria-label="Edit note"
              onClick={() => onEdit(note)}
            >
              <img src="/assets/edit-labels-icon.png" alt="" />
            </button>
            <button
              type="button"
              className="note-action-btn"
              title="Move to Bin"
              aria-label="Move note to Bin"
              onClick={() => onDelete(note.id)}
            >
              <img src="/assets/bin-icon.png" alt="" />
            </button>
            <button
              type="button"
              className="note-action-btn"
              title={note.archived ? "Unarchive" : "Archive"}
              aria-label={note.archived ? "Unarchive note" : "Archive note"}
              onClick={() => onArchive(note.id)}
            >
              <img
                src={
                  note.archived
                    ? "/assets/unarchive-icon.png"
                    : "/assets/archive-icon.png"
                }
                alt=""
              />
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default NoteCard;
