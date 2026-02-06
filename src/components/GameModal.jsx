import "./GameModal.css";

function GameModal({ isOpen, onClose, game }) {
  if (!isOpen || !game) return null;

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div
        className="game-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="game-modal-close" onClick={onClose}>
          ✕
        </button>

<div className="game-modal-image-wrapper">
  {game.image && (
    <img
      src={game.image}
      alt={game.title}
      className="game-modal-image"
    />
  )}
</div>

        <div className="game-modal-content">
          <h2 className="game-modal-title">{game.title}</h2>
          <span className="game-modal-genre">{game.genre}</span>

          <p className="game-modal-rating">⭐ {game.rating} / 10</p>

          {game.description && (
            <p className="game-modal-description">{game.description}</p>
          )}

          {game.developer && (
            <p className="game-modal-info">🎮 Développeur : {game.developer}</p>
          )}

          {game.platform && (
            <p className="game-modal-info">🕹 Plateforme : {game.platform}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameModal;
