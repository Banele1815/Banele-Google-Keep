/**
 * Google Keep Clone - Application Logic
 * Handles note creation, editing, deletion, archiving, and search.
 * Notes are persisted to localStorage.
 */

const STORAGE_KEY = "keep-clone-notes-v1";

/**
 * Central application state.
 * @property {Array<Object>} notes - All notes (active and archived).
 * @property {string|null} editingId - ID of the note currently being edited, or null.
 * @property {boolean} showArchived - Whether the archive view is currently active.
 * @property {string} searchTerm - Current search query (lowercase).
 */
const state = {
  notes: loadNotes(),
  editingId: null,
  showArchived: false,
  searchTerm: "",
};

// DOM references
const noteModal = document.getElementById("noteModal");
const noteForm = document.getElementById("noteForm");
const noteTitleInput = document.getElementById("noteTitle");
const noteTextInput = document.getElementById("noteText");
const notesList = document.getElementById("notesList");
const modalTitle = document.getElementById("modalTitle");
const composerInput = document.getElementById("composerInput");
const searchInput = document.querySelector(".search-input");
const sectionTitle = document.querySelector(".header-left h1");

/**
 * Loads notes from localStorage.
 * @returns {Array<Object>} Array of note objects, or an empty array if none exist.
 */
function loadNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Unable to load notes", error);
    return [];
  }
}

/**
 * Persists the current notes array to localStorage.
 */
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.notes));
}

/**
 * Opens the note modal, either empty (new note) or pre-filled (editing).
 * @param {Object|null} note - The note to edit, or null to create a new one.
 */
function openModal(note = null) {
  if (note) {
    state.editingId = note.id;
    modalTitle.textContent = "Edit note";
    noteTitleInput.value = note.title;
    noteTextInput.value = note.text;
  } else {
    state.editingId = null;
    modalTitle.textContent = "Take a note";
    noteForm.reset();
  }

  noteModal.classList.remove("hidden");
  noteTitleInput.focus();
}

/**
 * Closes the note modal and resets the form.
 */
function closeModal() {
  noteModal.classList.add("hidden");
  noteForm.reset();
  state.editingId = null;
}

/**
 * Escapes HTML special characters to prevent injection when rendering note content.
 * @param {string} value - Raw string to escape.
 * @returns {string} Escaped, safe-to-render string.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Builds the HTML markup for a single note card.
 * @param {Object} note - The note to render.
 * @returns {string} HTML string for the note card.
 */
function createNoteCard(note) {
  const text = escapeHtml(note.text || "");
  const title = escapeHtml(note.title || "");
  const archiveIcon = note.archived
    ? "assets/notes icon.png"
    : "assets/Archive icon.png";
  const archiveLabel = note.archived ? "Unarchive" : "Archive";

  return `
    <div class="note-card" data-id="${note.id}" role="button" tabindex="0">
      ${title ? `<h3 class="note-title">${title}</h3>` : ""}
      ${text ? `<p class="note-text">${text}</p>` : ""}
      <div class="note-actions">
        <button class="note-action-btn" data-action="edit" type="button" title="Edit">
          <img src="assets/edit labels icon.png" alt="" />
        </button>
        <button class="note-action-btn" data-action="delete" type="button" title="Delete">
          <img src="assets/bin icon.png" alt="" />
        </button>
        <button class="note-action-btn" data-action="archive" type="button" title="${archiveLabel}">
          <img src="${archiveIcon}" alt="" />
        </button>
      </div>
    </div>
  `;
}

/**
 * Filters notes according to the current view (active vs archived) and search term,
 * then renders them into the notes grid. Updates the page heading to reflect the view.
 */
function renderNotes() {
  const term = state.searchTerm.trim().toLowerCase();

  const visibleNotes = state.notes
    .filter((note) => (state.showArchived ? note.archived : !note.archived))
    .filter((note) => {
      if (!term) return true;
      const haystack = `${note.title} ${note.text}`.toLowerCase();
      return haystack.includes(term);
    });

  sectionTitle.textContent = state.showArchived ? "Archive" : "Keep";
  composerInput.style.display = state.showArchived ? "none" : "";

  if (visibleNotes.length === 0) {
    const emptyMessage = state.showArchived
      ? "No archived notes"
      : term
        ? "No notes match your search"
        : "No notes yet";
    notesList.innerHTML = `<div style="padding: 2rem; text-align: center; color: #999;">${emptyMessage}</div>`;
  } else {
    notesList.innerHTML = visibleNotes.map(createNoteCard).join("");
  }
}

/**
 * Handles submission of the note form (create or update depending on editingId).
 * @param {SubmitEvent} event
 */
function handleNoteSubmit(event) {
  event.preventDefault();

  const title = noteTitleInput.value.trim();
  const text = noteTextInput.value.trim();

  if (!title && !text) {
    closeModal();
    return;
  }

  if (state.editingId) {
    state.notes = state.notes.map((note) =>
      note.id === state.editingId ? { ...note, title, text } : note,
    );
  } else {
    state.notes.unshift({
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title,
      text,
      archived: false,
      createdAt: new Date().toISOString(),
    });
  }

  saveNotes();
  renderNotes();
  closeModal();
}

/**
 * Handles clicks on note action buttons (edit, delete, archive/unarchive).
 * @param {MouseEvent} event
 */
function handleNoteActions(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const card = button.closest(".note-card");
  if (!card) return;

  const noteId = card.dataset.id;
  const action = button.dataset.action;

  if (action === "edit") {
    const note = state.notes.find((item) => item.id === noteId);
    if (note) openModal(note);
    return;
  }

  if (action === "delete") {
    state.notes = state.notes.filter((note) => note.id !== noteId);
  }

  if (action === "archive") {
    state.notes = state.notes.map((note) =>
      note.id === noteId ? { ...note, archived: !note.archived } : note,
    );
  }

  saveNotes();
  renderNotes();
}

// ---- Event Listeners ----

composerInput.addEventListener("click", () => openModal());
document.getElementById("cancelNote").addEventListener("click", closeModal);

document.addEventListener("click", (event) => {
  if (event.target === noteModal) {
    closeModal();
  }
});

noteForm.addEventListener("submit", handleNoteSubmit);

notesList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (button) {
    handleNoteActions(event);
    return;
  }
  
  const card = event.target.closest(".note-card");
  if (card) {
    const noteId = card.dataset.id;
    const note = state.notes.find((item) => item.id === noteId);
    if (note) openModal(note);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Live search
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    renderNotes();
  });
}

// Sidebar navigation: only "Notes" and "Archive" are functional views.
document.querySelectorAll(".nav-item").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    document
      .querySelectorAll(".nav-item")
      .forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    const section = link.dataset.section;

    if (section === "archive") {
      state.showArchived = true;
    } else if (section === "notes") {
      state.showArchived = false;
    }

    renderNotes();
  });
});

renderNotes();