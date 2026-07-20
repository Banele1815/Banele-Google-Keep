import NoteCard from "./NoteCard";

function NotesGrid({
  notes,
  currentView,
  onEdit,
  onDelete,
  onArchive,
  onRestore,
  onDeleteForever,
}) {
  if (notes.length === 0) {
    const emptyMessages = {
      notes: "No notes yet",
      archive: "No archived notes",
      bin: "Bin is empty",
    };

    return (
      <div className="notes-grid">
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
        />
      ))}
    </div>
  );
}

export default NotesGrid;