import { Link } from "react-router-dom"
import games from "../data/games"
import "./Games.css"

function Games() {
  return (
    <div className="games-page">
      <h2>🎮 Liste des jeux</h2>

      <div className="games-grid">
        {games.map(game => (
          <div className="game-card" key={game.id}>
            <h3>{game.title}</h3>
            <p>{game.genre}</p>
            <p>⭐ {game.rating}</p>

            <Link to={`/games/${game.id}`} className="btn">
              Voir le jeu
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Games
