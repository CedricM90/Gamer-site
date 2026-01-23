import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import "./Games.css";

function Games() {
  const [games, setGames] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);     
  const [errorMessage, setErrorMessage] = useState(null);         
  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then(setGames)
      .catch(console.error);
  }, []);

  const openDeleteModal = (game) => {
    setGameToDelete(game);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!gameToDelete) return;

    fetch(`http://localhost:3001/games/${gameToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Échec de la suppression");
        }
        // Succès
        setGames((prev) => prev.filter((g) => g.id !== gameToDelete.id));
        setSuccessMessage(`"${gameToDelete.title}" a été supprimé avec succès !`);
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch((err) => {
        console.error("Erreur suppression :", err);
        setErrorMessage("Erreur lors de la suppression. Réessayez.");
        setTimeout(() => setErrorMessage(null), 4000);
      })
      .finally(() => {
        setModalOpen(false);
        setGameToDelete(null);
      });
  };

  const closeModal = () => {
    setModalOpen(false);
    setGameToDelete(null);
  };

  const filteredGames = games.filter(game => {
  const matchTitle = game.title
    .toLowerCase()
    .includes(search.toLowerCase())

  const matchGenre = genre === "" || game.genre === genre

  return matchTitle && matchGenre
})

const genres = [...new Set(games.map(game => game.genre))]

  return (
    <div className="games-page">
      <h2>🎮 Liste des jeux</h2>

      {/* Messages toast */}
      {successMessage && (
        <div className="toast success-toast">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="toast error-toast">{errorMessage}</div>
      )}

      {games.length === 0 && (
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "2rem" }}>
          Aucun jeu pour le moment...
        </p>
      )}

      <div style={{ marginBottom: "1.5rem" }}>
  <input
    type="text"
    placeholder="Rechercher un jeu..."
    value={search}
    onChange={e => setSearch(e.target.value)}
  />
<button
  onClick={() => { setSearch(""); setGenre(""); }}
  style={{ marginLeft: "0.5rem" }}
>
  Reset filtres
</button>
<select
  value={genre}
  onChange={e => setGenre(e.target.value)}
  style={{ marginLeft: "1rem" }}
>
  <option value="">Tous les genres</option>
  {genres.map((g, index) => (
    <option key={index} value={g}>{g}</option>
  ))}
</select>

</div>


<div className="games-grid">
  {filteredGames.length === 0 ? (
    <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
      Aucun jeu trouvé 😢
    </p>
  ) : (
    filteredGames.map(game => (
      <div className="game-card" key={game.id}>
        <h3>{game.title}</h3>
        <p>{game.genre}</p>
        <p>⭐ {game.rating}/10</p>
        <div className="card-actions">
          <Link to={`/games/${game.id}`} className="btn view">
            Voir
          </Link>
          <Link to={`/games/${game.id}/edit`} className="btn">
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
    ))
  )}
</div>


      {/* Le modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title="Confirmer la suppression"
        message={
          gameToDelete
            ? `Voulez-vous vraiment supprimer "${gameToDelete.title}" ? Cette action est irréversible.`
            : ""
        }
      />
    </div>
  );
}

export default Games;