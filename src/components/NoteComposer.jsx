function NoteComposer({ onOpen }) {
  return (
    <section className="composer-section">
      <div className="composer-box">
        <input
          id="composerInput"
          type="text"
          placeholder="Take a note..."
          readOnly
          onClick={onOpen}
        />

        <div className="composer-actions">
          <button
            type="button"
            className="composer-btn"
            title="New list"
            onClick={onOpen}
          >
            <img src="/assets/new-list-icon.png" alt="" />
          </button>

          <button
            type="button"
            className="composer-btn"
            title="New note with drawing"
            onClick={onOpen}
          >
            <img src="/assets/new-note-drawing-icon.png" alt="" />
          </button>

          <button
            type="button"
            className="composer-btn"
            title="New note with image"
            onClick={onOpen}
          >
            <img src="/assets/new-note-image-icon.png" alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default NoteComposer;