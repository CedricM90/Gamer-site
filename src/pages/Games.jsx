import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import GameModal from "../components/GameModal";
import "./Games.css";
import { getGames, deleteGame } from "../services/api";

function Games() {
  const [games, setGames] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [modalGameOpen, setModalGameOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  /* ---------------- LOAD GAMES ---------------- */
  useEffect(() => {
    getGames()
      .then(setGames)
      .catch(() => setErrorMessage("Impossible de charger les jeux"));
  }, []);

  /* ---------------- DELETE MODAL ---------------- */
  const openDeleteModal = (game) => {
    setGameToDelete(game);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setGameToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!gameToDelete) return;

    deleteGame(gameToDelete.id)
      .then(() => {
        setGames((prev) => prev.filter((g) => g.id !== gameToDelete.id));
        setSuccessMessage(`"${gameToDelete.title}" supprimé avec succès`);
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch(() => {
        setErrorMessage("Erreur lors de la suppression");
        setTimeout(() => setErrorMessage(null), 4000);
      })
      .finally(() => closeDeleteModal());
  };

  /* ---------------- GAME MODAL ---------------- */
  const openGameModal = (game) => {
    setSelectedGame(game);
    setModalGameOpen(true);
  };

  const closeGameModal = () => {
    setSelectedGame(null);
    setModalGameOpen(false);
  };

  /* ---------------- FILTER / SORT ---------------- */
  const filteredGames = games.filter((game) => {
    const matchTitle = game.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = selectedGenre === "" || game.genre === selectedGenre;
    return matchTitle && matchGenre;
  });

  const sortedGames = [...filteredGames];
  if (sortOrder === "asc") sortedGames.sort((a, b) => a.rating - b.rating);
  if (sortOrder === "desc") sortedGames.sort((a, b) => b.rating - a.rating);

  const genres = [...new Set(games.map((game) => game.genre))];

  /* ---------------- JSX ---------------- */
  return (
    <div className="games-page">
      <h2>🎮 Liste des jeux</h2>

      {successMessage && <div className="toast success">{successMessage}</div>}
      {errorMessage && <div className="toast error">{errorMessage}</div>}

      {/* FILTRES */}
      <div className="filters">
        <div className="filters-main">
          <input
            type="text"
            placeholder="Rechercher un jeu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">Tous les genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Trier par note</option>
            <option value="asc">Note croissante</option>
            <option value="desc">Note décroissante</option>
          </select>
        </div>

        <button
          className="btn reset"
          onClick={() => {
            setSearch("");
            setSelectedGenre("");
            setSortOrder("");
          }}
        >
          Reset filtres
        </button>
      </div>

      {/* GRID */}
      <div className="games-grid">
        {sortedGames.length === 0 ? (
          <p className="empty">Aucun jeu trouvé 😢</p>
        ) : (
          sortedGames.map((game) => (
            <div className="game-card" key={game.id}>
<div className="game-image-wrapper">
  {game.image ? (
    <img src={game.image} alt={game.title} />
  ) : (
    // Optionnel : placeholder
    <div className="no-image-placeholder">Pas d'image</div>
  )}
  <span className="game-rating">⭐ {game.rating}</span>
</div>

              <div className="game-content">
                <h3>{game.title}</h3>
                <span className="game-genre">{game.genre}</span>

                <div className="card-actions">
                  <button className="btn view" onClick={() => openGameModal(game)}>
                    Voir
                  </button>
                  <Link className="btn modify" to={`/games/${game.id}/edit`}>
                    Modifier
                  </Link>
                  <button className="btn delete" onClick={() => openDeleteModal(game)}>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODALS */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Confirmer la suppression"
        message={gameToDelete ? `Supprimer "${gameToDelete.title}" ?` : ""}
      />

      <GameModal
        isOpen={modalGameOpen}
        onClose={closeGameModal}
        game={selectedGame}
      />
    </div>
  );
}

export default Games;
