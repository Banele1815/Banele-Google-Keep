# Banele Google Keep Clone

A responsive Google Keep-inspired note application built with React and Vite. Notes are stored in the browser with `localStorage`, so the application works without a backend.

## Features

- Create and edit title-and-text, title-only, and text-only notes
- Live search across note titles, content, and category tags
- Archive, unarchive, move to Bin, restore, and permanently delete notes
- Pin important notes and display pinned notes first
- Colour-code notes with six colour options
- Add up to five searchable category tags per note
- Add, edit, remove, and review date-and-time reminders
- Dedicated Notes, Reminders, Labels, Archive, and Bin views
- Light and dark themes saved between visits
- Responsive desktop, tablet, and mobile layouts
- Persistent browser storage using `localStorage`

## Built With

- React 19
- Vite 8
- JavaScript and JSX
- CSS custom properties and responsive media queries
- Browser `localStorage`

## Project Structure

```text
Banele-Google-Keep-react/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── NoteCard.jsx
│   │   ├── NoteComposer.jsx
│   │   ├── NoteModal.jsx
│   │   ├── NotesGrid.jsx
│   │   └── Sidebar.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Run Locally

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Local Storage

Notes are stored under `keep-clone-notes-v1`, while the selected theme is stored under `keep-clone-theme`. Data is tied to the current browser and website origin.

## Deployment

For Netlify, use:

```text
Build command: npm run build
Publish directory: dist
```

## Author

**Banele Kubeka**

- GitHub: [Banele1815](https://github.com/Banele1815)
- Portfolio: [gcina-banele-portfolio.netlify.app](https://gcina-banele-portfolio.netlify.app)
- LinkedIn: [gcina-banele-kubeka](https://www.linkedin.com/in/gcina-banele-kubeka)

## License

This project is intended for educational and portfolio use.
