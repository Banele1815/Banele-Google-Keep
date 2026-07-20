function NoteCard({
  note,
  currentView,
  onEdit,
  onDelete,
  onArchive,
  onRestore,
  onDeleteForever,
}) {
  return (
    <article className="note-card">
      <div>
        {note.title && <h3 className="note-title">{note.title}</h3>}
        {note.text && <p className="note-text">{note.text}</p>}
      </div>

      <div className="note-actions">
        {currentView === "bin" ? (
          <>
            <button
              type="button"
              className="note-action-btn"
              title="Restore"
              onClick={() => onRestore(note.id)}
            >
              <img src="/assets/restore-icon.png" alt="" />
            </button>

            <button
              type="button"
              className="note-action-btn"
              title="Delete forever"
              onClick={() => onDeleteForever(note.id)}
            >
              <img src="/assets/bin-icon.png" alt="" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="note-action-btn"
              title="Edit"
              onClick={() => onEdit(note)}
            >
              <img src="/assets/edit-labels-icon.png" alt="" />
            </button>

            <button
              type="button"
              className="note-action-btn"
              title="Move to Bin"
              onClick={() => onDelete(note.id)}
            >
              <img src="/assets/bin-icon.png" alt="" />
            </button>

            <button
              type="button"
              className="note-action-btn"
              title={note.archived ? "Unarchive" : "Archive"}
              onClick={() => onArchive(note.id)}
            >
            <img
              src={
                note.archived
                  ? "/assets/unarchive-icon.png"
                  : "/assets/archive-icon.png"
              }
              alt={note.archived ? "Unarchive" : "Archive"}
            />
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default NoteCard;