import { useParams, useNavigate } from "react-router-dom"
import games from "../data/games"
import "./GameDetails.css"

function GameDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const game = games.find(g => g.id === Number(id))

  if (!game) return <p>Jeu introuvable 😢</p>

  return (
    <div className="game-details">
      <h2>{game.title}</h2>
      <p><strong>Genre :</strong> {game.genre}</p>
      <p><strong>Note :</strong> ⭐ {game.rating}</p>
      <p>{game.description}</p>

      <button onClick={() => navigate("/games")} className="btn">
        ← Retour à la liste
      </button>
    </div>
  )
}

export default GameDetails
