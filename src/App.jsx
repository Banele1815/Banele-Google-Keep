import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteComposer from "./components/NoteComposer";
import NoteModal from "./components/NoteModal";
import NotesGrid from "./components/NotesGrid";

const STORAGE_KEY = "keep-clone-notes-v1";
const THEME_KEY = "keep-clone-theme";

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];

  return [...new Set(tags.map((tag) => String(tag).trim().toLowerCase()))]
    .filter(Boolean)
    .slice(0, 5);
}

function loadNotes() {
  try {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];

    if (!Array.isArray(parsedNotes)) return [];

    return parsedNotes.map((note) => ({
      ...note,
      color: note.color ?? "default",
      pinned: Boolean(note.pinned),
      tags: normalizeTags(note.tags),
      reminderAt: note.reminderAt ?? "",
    }));
  } catch (error) {
    console.error("Unable to load notes:", error);
    return [];
  }
}

function loadTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch (error) {
    console.warn("Unable to load the saved theme:", error);
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [currentView, setCurrentView] = useState("notes");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  function handleSaveNote({ title, text, color, tags, reminderAt }) {
    const cleanTitle = title.trim();
    const cleanText = text.trim();
    const cleanTags = normalizeTags(tags);
    const cleanColor = color || "default";
    const reminderDate = reminderAt ? new Date(reminderAt) : null;
    const cleanReminder =
      reminderDate && !Number.isNaN(reminderDate.getTime())
        ? reminderDate.toISOString()
        : "";

    if (!cleanTitle && !cleanText) {
      setEditingNote(null);
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
                color: cleanColor,
                tags: cleanTags,
                reminderAt: cleanReminder,
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
        color: cleanColor,
        tags: cleanTags,
        reminderAt: cleanReminder,
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
        note.id === noteId ? { ...note, deleted: true } : note,
      ),
    );
  }

  function handleArchive(noteId) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? { ...note, archived: !note.archived }
          : note,
      ),
    );
  }

  function handleRestore(noteId) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? { ...note, deleted: false, archived: false }
          : note,
      ),
    );
  }

  function handleDeleteForever(noteId) {
    const confirmed = window.confirm(
      "Delete this note forever? This cannot be undone.",
    );

    if (!confirmed) return;

    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    );
  }

  function handleTogglePin(noteId) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note,
      ),
    );
  }

  function handleViewChange(view) {
    setCurrentView(view);
    setSelectedTag("");
  }

  const availableTags = useMemo(
    () =>
      [
        ...new Set(
          notes
            .filter((note) => !note.deleted)
            .flatMap((note) => normalizeTags(note.tags)),
        ),
      ].sort((first, second) => first.localeCompare(second)),
    [notes],
  );

  const visibleNotes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return notes
      .filter((note) => {
        if (currentView === "bin") return note.deleted;
        if (currentView === "archive") {
          return note.archived && !note.deleted;
        }
        if (currentView === "reminders") {
          return Boolean(note.reminderAt) && !note.deleted && !note.archived;
        }
        if (currentView === "labels") {
          return (
            normalizeTags(note.tags).length > 0 &&
            !note.deleted &&
            !note.archived
          );
        }

        return !note.archived && !note.deleted;
      })
      .filter((note) => {
        if (!term) return true;

        const searchableContent = [
          note.title ?? "",
          note.text ?? "",
          ...normalizeTags(note.tags),
        ]
          .join(" ")
          .toLowerCase();

        return searchableContent.includes(term);
      })
      .filter((note) =>
        selectedTag ? normalizeTags(note.tags).includes(selectedTag) : true,
      )
      .sort((first, second) => {
        if (currentView === "reminders") {
          return new Date(first.reminderAt) - new Date(second.reminderAt);
        }

        const pinDifference = Number(second.pinned) - Number(first.pinned);
        if (pinDifference !== 0) return pinDifference;

        return new Date(second.createdAt ?? 0) - new Date(first.createdAt ?? 0);
      });
  }, [currentView, notes, searchTerm, selectedTag]);

  return (
    <div className="app-container">
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <main className="main-content">
        <Header
          currentView={currentView}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          theme={theme}
          onThemeToggle={() =>
            setTheme((currentTheme) =>
              currentTheme === "dark" ? "light" : "dark",
            )
          }
        />

        {currentView === "notes" && (
          <NoteComposer
            onOpen={() => {
              setEditingNote(null);
              setIsModalOpen(true);
            }}
          />
        )}

        {availableTags.length > 0 && currentView !== "bin" && (
          <section className="tag-filter-bar" aria-label="Filter notes by tag">
            <span className="tag-filter-label">Categories</span>
            <button
              type="button"
              className={`tag-filter ${selectedTag === "" ? "active" : ""}`}
              onClick={() => setSelectedTag("")}
            >
              All
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`tag-filter ${selectedTag === tag ? "active" : ""}`}
                onClick={() => setSelectedTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </section>
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
            onTogglePin={handleTogglePin}
            onTagSelect={setSelectedTag}
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
