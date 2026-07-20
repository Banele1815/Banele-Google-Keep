const viewTitles = {
  notes: "Keep",
  archive: "Archive",
  bin: "Bin",
};

function Header({ currentView, searchTerm, onSearchChange }) {
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

      <div className="search-wrapper">
        <img
          src="/assets/search-icon.png"
          alt=""
          className="search-icon"
        />

        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="header-actions">
        <button type="button" className="icon-button" title="Refresh">
          <img src="/assets/refresh-icon.png" alt="" />
        </button>

        <button type="button" className="icon-button" title="List view">
          <img src="/assets/list-view-icon.png" alt="" />
        </button>

        <button type="button" className="icon-button" title="Settings">
          <img src="/assets/settings-icon.png" alt="" />
        </button>

        <button type="button" className="icon-button" title="Google Apps">
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