# Google Keep Clone

A simplified version of Google Keep built with vanilla HTML, CSS, and JavaScript. Notes are created, edited, deleted, and archived through a clean, responsive interface, and everything is persisted in the browser's `localStorage`.

**Author:** Gcina Banele Kubeka

## Features

- **Create notes** — click "Take a note..." to open the composer modal, add a title and/or text, and save.
- **Edit notes** — click any note card to reopen it in edit mode.
- **Delete notes** — hover over a note card to reveal action buttons, including delete.
- **Archive / unarchive notes** — hover over a note card and click the archive icon. Archived notes are moved out of the main view and can be viewed via the **Archive** link in the sidebar; the archive icon toggles the note back to active.
- **Search** — type in the search bar to filter notes by title or text in real time.
- **Persistence** — all notes are saved to `localStorage`, so they remain after refreshing or closing the browser.
- **Responsive layout** — the interface adapts across desktop, tablet, and mobile screen widths.

## Project Structure

```
.
├── index.html      # App markup and structure
├── styles.css      # All styling, including responsive breakpoints
├── script.js       # App logic: state, rendering, event handling
├── assets/         # Icons and images used throughout the UI
└── README.md       # This is my README
```

## Running the Project

No build step, server, or dependencies are required.

**Option 1 — Open directly:**
1. Download or clone this repository.
2. Double-click `index.html` (or right-click → Open With → your browser).

**Option 2 — Local server (recommended for consistent behavior):**
```bash
npx serve .
```
Then open the printed local URL (e.g. `http://localhost:3000`) in your browser.

## Notes on Implementation

- State is kept in a single in-memory `state` object and mirrored to `localStorage` on every change, so a page refresh doesn't lose data.
- The sidebar's **Reminders**, **Edit labels**, and **Bin** links are present in the UI for visual completeness but are not implemented in this version — only **Notes** and **Archive** are functional views.
- The "New list", "New note with drawing", and "New note with image" composer icons are visual placeholders matching the Google Keep UI and are not wired to functionality in this version.

## Possible Future Improvements

- Implement the Bin (soft-delete with restore) instead of permanent deletion.
- Add note color/label support.
- Add drag-and-drop reordering of notes.
