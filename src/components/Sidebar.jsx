function Sidebar({ currentView, onViewChange }) {
  return (
    <aside className="sidebar">
      <button type="button" className="menu-toggle" aria-label="Open menu">
        <img src="/assets/menu-icon.png" alt="" />
      </button>

      <nav className="sidebar-nav" aria-label="Keep navigation">
        <button
          type="button"
          className={`nav-item ${
            currentView === "notes" ? "active" : ""
          }`}
          onClick={() => onViewChange("notes")}
        >
          <img src="/assets/notes-icon.png" alt="" />
          <span>Notes</span>
        </button>

        <button type="button" className="nav-item">
          <img src="/assets/reminders-icon.png" alt="" />
          <span>Reminders</span>
        </button>

        <button type="button" className="nav-item">
          <img src="/assets/edit-labels-icon.png" alt="" />
          <span>Edit labels</span>
        </button>

        <button
          type="button"
          className={`nav-item ${
            currentView === "archive" ? "active" : ""
          }`}
          onClick={() => onViewChange("archive")}
        >
          <img src="/assets/archive-icon.png" alt="" />
          <span>Archive</span>
        </button>

        <button
          type="button"
          className={`nav-item ${
            currentView === "bin" ? "active" : ""
          }`}
          onClick={() => onViewChange("bin")}
        >
          <img src="/assets/bin-icon.png" alt="" />
          <span>Bin</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;