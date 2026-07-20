import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteComposer from "./components/NoteComposer";
import NoteModal from "./components/NoteModal";
import NotesGrid from "./components/NotesGrid";

const STORAGE_KEY = "keep-clone-notes-v1";

function loadNotes() {
  try {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    return storedNotes ? JSON.parse(storedNotes) : [];
  } catch (error) {
    console.error("Unable to load notes:", error);
    return [];
  }
}

function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [currentView, setCurrentView] = useState("notes");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function handleSaveNote({ title, text }) {
    const cleanTitle = title.trim();
    const cleanText = text.trim();

    if (!cleanTitle && !cleanText) {
      setIsModalOpen(false);
      return;
    }

    if (editingNote) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                title: cleanTitle,
                text: cleanText,
              }
            : note,
        ),
      );
    } else {
      const newNote = {
        id:
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : Date.now().toString(),
        title: cleanTitle,
        text: cleanText,
        archived: false,
        deleted: false,
        pinned: false,
        createdAt: new Date().toISOString(),
      };

      setNotes((currentNotes) => [newNote, ...currentNotes]);
    }

    setEditingNote(null);
    setIsModalOpen(false);
  }

  function handleEdit(note) {
    setEditingNote(note);
    setIsModalOpen(true);
  }

  function handleDelete(noteId) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              deleted: true,
            }
          : note,
      ),
    );
  }

  function handleArchive(noteId) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              archived: !note.archived,
            }
          : note,
      ),
    );
  }

  function handleRestore(noteId) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              deleted: false,
              archived: false,
            }
          : note,
      ),
    );
  }

  function handleDeleteForever(noteId) {
    const confirmed = window.confirm(
      "Delete this note forever? This cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    );
  }

  const visibleNotes = notes
    .filter((note) => {
      if (currentView === "bin") {
        return note.deleted;
      }

      if (currentView === "archive") {
        return note.archived && !note.deleted;
      }

      return !note.archived && !note.deleted;
    })
    .filter((note) => {
      const term = searchTerm.trim().toLowerCase();

      if (!term) {
        return true;
      }

      const title = note.title ?? "";
      const text = note.text ?? "";
      const searchableContent = `${title} ${text}`.toLowerCase();

      return searchableContent.includes(term);
    });

  return (
    <div className="app-container">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="main-content">
        <Header
          currentView={currentView}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {currentView === "notes" && (
          <NoteComposer
            onOpen={() => {
              setEditingNote(null);
              setIsModalOpen(true);
            }}
          />
        )}

        <section className="notes-container">
          <NotesGrid
            notes={visibleNotes}
            currentView={currentView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onRestore={handleRestore}
            onDeleteForever={handleDeleteForever}
          />
        </section>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        editingNote={editingNote}
        onSave={handleSaveNote}
        onClose={() => {
          setEditingNote(null);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;