import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./GameDetails.css"

function GameDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/games/${id}`)
      .then(res => res.json())
      .then(data => setGame(data))
  }, [id])

  if (!game) return <p>Cette page n'éxiste pas</p>

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
