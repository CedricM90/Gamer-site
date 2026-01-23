import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Games.css"

function Games() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then(res => res.json())
      .then(data => setGames(data))
  }, [])

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
