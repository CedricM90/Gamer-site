import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import "./Games.css";
import { getGames, deleteGame } from "../services/api";

function Games() {
  const [games, setGames] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "" | "asc" | "desc"

  // Charger les jeux depuis l'API
  useEffect(() => {
    getGames()
      .then(setGames)
      .catch(() =>
        setErrorMessage("Impossible de charger les jeux")
      );
  }, []);

  // Ouvrir la modal de suppression
  const openDeleteModal = (game) => {
    setGameToDelete(game);
    setModalOpen(true);
  };

  // Confirmer la suppression
  const handleConfirmDelete = () => {
    if (!gameToDelete) return;

    deleteGame(gameToDelete.id)
      .then(() => {
        setGames((prev) =>
          prev.filter((g) => g.id !== gameToDelete.id)
        );
        setSuccessMessage(
          `"${gameToDelete.title}" a été supprimé avec succès !`
        );
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch(() => {
        setErrorMessage("Erreur lors de la suppression.");
        setTimeout(() => setErrorMessage(null), 4000);
      })
      .finally(() => {
        setModalOpen(false);
        setGameToDelete(null);
      });
  };

  // Fermer la modal
  const closeModal = () => {
    setModalOpen(false);
    setGameToDelete(null);
  };

  // Filtrer par recherche et genre
  const filteredGames = games.filter((game) => {
    const matchTitle = game.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchGenre =
      selectedGenre === "" || game.genre === selectedGenre;
    return matchTitle && matchGenre;
  });

  // Trier selon le choix
  const sortedGames = [...filteredGames];
  if (sortOrder === "asc") {
    sortedGames.sort((a, b) => a.rating - b.rating);
  } else if (sortOrder === "desc") {
    sortedGames.sort((a, b) => b.rating - a.rating);
  }

  // Générer la liste des genres
  const genres = [...new Set(games.map((game) => game.genre))];

  return (
    <div className="games-page">
      <h2>🎮 Liste des jeux</h2>

      {/* TOASTS */}
      {successMessage && (
        <div className="toast success-toast">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="toast error-toast">{errorMessage}</div>
      )}

      {/* FILTRES */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Rechercher un jeu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => {
            setSearch("");
            setSelectedGenre("");
            setSortOrder("");
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Reset filtres
        </button>

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ marginLeft: "1rem" }}
        >
          <option value="">Tous les genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ marginLeft: "1rem" }}
        >
          <option value="">Trier par note</option>
          <option value="asc">Note croissante</option>
          <option value="desc">Note décroissante</option>
        </select>
      </div>

      {/* GRID DES JEUX */}
      <div className="games-grid">
        {sortedGames.length === 0 ? (
          <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
            Aucun jeu trouvé 😢
          </p>
        ) : (
          sortedGames.map((game) => (
            <div className="game-card" key={game.id}>
              <div className="game-image-wrapper">
                <img
                  src={game.image}
                  alt={game.title}
                  className="game-image"
                />
                <span className="game-rating">⭐ {game.rating}</span>
              </div>

              <div className="game-content">
                <h3 className="game-title">{game.title}</h3>
                <span className="game-genre">{game.genre}</span>

                <div className="card-actions">
                  <Link to={`/games/${game.id}`} className="btn view">
                    Voir
                  </Link>
                  <Link
                    to={`/games/${game.id}/edit`}
                    className="btn modify"
                  >
                    Modifier
                  </Link>
                  <button
                    className="btn delete"
                    onClick={() => openDeleteModal(game)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL SUPPRESSION */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title="Confirmer la suppression"
        message={
          gameToDelete
            ? `Voulez-vous vraiment supprimer "${gameToDelete.title}" ?`
            : ""
        }
      />
    </div>
  );
}

export default Games;
