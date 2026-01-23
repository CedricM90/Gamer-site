import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddGame() {
  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [rating, setRating] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newGame = {
      title,
      genre,
      rating: Number(rating),
      description
    }

    fetch("http://localhost:3001/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGame)
    }).then(() => {
      navigate("/games")
    })
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>➕ Ajouter un jeu</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Titre"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          placeholder="Genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Note"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button className="btn">Ajouter</button>
      </form>
    </div>
  )
}

export default AddGame
