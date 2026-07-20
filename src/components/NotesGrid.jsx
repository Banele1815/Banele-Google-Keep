import NoteCard from "./NoteCard";

function NotesGrid({
  notes,
  currentView,
  onEdit,
  onDelete,
  onArchive,
  onRestore,
  onDeleteForever,
  onTogglePin,
  onTagSelect,
}) {
  if (notes.length === 0) {
    const emptyMessages = {
      notes: "No notes found",
      reminders: "No reminder notes found",
      labels: "No tagged notes found",
      archive: "No archived notes found",
      bin: "Bin is empty",
    };

    return (
      <div className="empty-state" role="status">
        <span aria-hidden="true">🗒️</span>
        <p>{emptyMessages[currentView] ?? "No notes found"}</p>
      </div>
    );
  }

  return (
    <div className="notes-grid" aria-live="polite">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          currentView={currentView}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onRestore={onRestore}
          onDeleteForever={onDeleteForever}
          onTogglePin={onTogglePin}
          onTagSelect={onTagSelect}
        />
      ))}
    </div>
  );
}

export default NotesGrid;
