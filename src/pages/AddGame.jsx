import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddGame.css";

function AddGame() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(""); 
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(false); 

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Le titre est obligatoire";
    if (!genre.trim()) newErrors.genre = "Le genre est obligatoire";
    if (!rating) {
      newErrors.rating = "La note est obligatoire";
    } else if (isNaN(rating) || rating < 0 || rating > 10) {
      newErrors.rating = "La note doit être entre 0 et 10";
    }
    if (!description.trim()) newErrors.description = "La description est obligatoire";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newGame = {
      title: title.trim(),
      genre: genre.trim(),
      rating: Number(rating),
      image,
      description: description.trim(),
    };

    fetch("http://localhost:3001/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        return res.json();
      })
      .then(() => {
        setSuccessMessage(true); 

    
        setTimeout(() => {
          setSuccessMessage(false);
          navigate("/games");
        }, 2500);
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de l'ajout du jeu. Vérifie la console.");
      });
  };

  return (
    <div className="add-game-container">
      <h2>➕ Ajouter un jeu</h2>

      {successMessage && (
        <div className="success-message">
          🎮 Jeu ajouté avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="Titre *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <input
            placeholder="Genre *"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={errors.genre ? "input-error" : ""}
          />
          {errors.genre && <span className="error-text">{errors.genre}</span>}
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Note (0-10) *"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="0"
            max="10"
            step="0.5"
            className={errors.rating ? "input-error" : ""}
          />
          {errors.rating && <span className="error-text">{errors.rating}</span>}
        </div>
        <input
  type="text"
  placeholder="URL de l'image"
  value={image}
  onChange={(e) => setImage(e.target.value)}
/>

        <div className="form-group">
          <textarea
            placeholder="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? "input-error" : ""}
          />
          {errors.description && (
            <span className="error-text">{errors.description}</span>
          )}
        </div>

        <button type="submit" className="btn">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AddGame;