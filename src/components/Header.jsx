const viewTitles = {
  notes: "Keep",
  reminders: "Reminders",
  labels: "Labels",
  archive: "Archive",
  bin: "Bin",
};

function Header({
  currentView,
  searchTerm,
  onSearchChange,
  theme,
  onThemeToggle,
}) {
  const nextThemeLabel =
    theme === "dark" ? "Enable light mode" : "Enable dark mode";

  return (
    <header className="app-header">
      <div className="header-left">
        <img
          src="/assets/google-keep-icon.png"
          alt="Google Keep"
          className="keep-logo"
        />
        <h1>{viewTitles[currentView] ?? "Keep"}</h1>
      </div>

      <label className="search-wrapper">
        <img src="/assets/search-icon.png" alt="" className="search-icon" />
        <span className="sr-only">Search notes</span>
        <input
          type="search"
          className="search-input"
          placeholder="Search notes and tags"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="header-actions">
        <button
          type="button"
          className="icon-button secondary-action"
          title="Refresh"
          aria-label="Refresh notes"
          onClick={() => window.location.reload()}
        >
          <img src="/assets/refresh-icon.png" alt="" />
        </button>

        <button
          type="button"
          className="icon-button secondary-action"
          title="List view"
          aria-label="List view"
        >
          <img src="/assets/list-view-icon.png" alt="" />
        </button>

        <button
          type="button"
          className="icon-button theme-toggle"
          title={nextThemeLabel}
          aria-label={nextThemeLabel}
          onClick={onThemeToggle}
        >
          <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
        </button>

        <button
          type="button"
          className="icon-button secondary-action"
          title="Settings"
          aria-label="Settings"
        >
          <img src="/assets/settings-icon.png" alt="" />
        </button>

        <button
          type="button"
          className="icon-button secondary-action"
          title="Google Apps"
          aria-label="Google Apps"
        >
          <img src="/assets/google-apps-icon.png" alt="" />
        </button>

        <button type="button" className="profile-button" title="Profile">
          B
        </button>
      </div>
    </header>
  );
}

export default Header;
