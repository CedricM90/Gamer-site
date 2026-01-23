import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function EditGame() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [rating, setRating] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3001/games/${id}`)
      .then(res => res.json())
      .then(game => {
        setTitle(game.title)
        setGenre(game.genre)
        setRating(game.rating)
        setDescription(game.description)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedGame = {
      title,
      genre,
      rating: Number(rating),
      description
    }

    fetch(`http://localhost:3001/games/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedGame)
    }).then(() => {
      navigate(`/games/${id}`)
    })
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✏️ Modifier le jeu</h2>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <input value={genre} onChange={e => setGenre(e.target.value)} />
        <input
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button className="btn">Enregistrer</button>
      </form>
    </div>
  )
}

export default EditGame
