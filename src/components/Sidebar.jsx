const navigationItems = [
  { view: "notes", label: "Notes", icon: "notes-icon.png" },
  { view: "reminders", label: "Reminders", icon: "reminders-icon.png" },
  { view: "labels", label: "Labels", icon: "edit-labels-icon.png" },
  { view: "archive", label: "Archive", icon: "archive-icon.png" },
  { view: "bin", label: "Bin", icon: "bin-icon.png" },
];

function Sidebar({ currentView, onViewChange }) {
  return (
    <aside className="sidebar">
      <button type="button" className="menu-toggle" aria-label="Open menu">
        <img src="/assets/menu-icon.png" alt="" />
      </button>

      <nav className="sidebar-nav" aria-label="Keep navigation">
        {navigationItems.map((item) => (
          <button
            key={item.view}
            type="button"
            className={`nav-item ${currentView === item.view ? "active" : ""}`}
            onClick={() => onViewChange(item.view)}
          >
            <img src={`/assets/${item.icon}`} alt="" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
