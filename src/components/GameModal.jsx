import React from "react";
import { Link } from "react-router-dom";
import "./GameModal.css";

function GameModal({ isOpen, onClose, game, onDelete }) {
  if (!isOpen || !game) return null;

  return (
    <div className="gm-overlay" onClick={onClose}>
      <div className="gm-content" onClick={(e) => e.stopPropagation()}>
        {/* Bouton close */}
        <button className="gm-close" onClick={onClose}>✖</button>

        {/* Corps de la modal */}
        <div className="gm-body">
          <img src={game.image} alt={game.title} className="gm-image" />
          <h2 className="gm-title">{game.title}</h2>
          <span className="gm-genre">{game.genre}</span>
          <p className="gm-rating">⭐ {game.rating}/10</p>
          {game.description && <p className="gm-description">{game.description}</p>}
          {game.developer && <p className="gm-developer">Développeur : {game.developer}</p>}
          {game.platform && <p className="gm-platform">Plateforme : {game.platform}</p>}
        </div>

        {/* Boutons empilés */}
        <div className="gm-actions">
          <Link to={`/games/${game.id}`} className="btn view">Voir</Link>
          <Link to={`/games/${game.id}/edit`} className="btn modify">Modifier</Link>
          <button className="btn delete" onClick={() => onDelete(game)}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

export default GameModal;
