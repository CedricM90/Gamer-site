const API_URL = "http://localhost:3001/games"

export const getGames = () =>
  fetch(API_URL).then(res => {
    if (!res.ok) throw new Error("Erreur chargement jeux")
    return res.json()
  })

export const getGameById = (id) =>
  fetch(`${API_URL}/${id}`).then(res => {
    if (!res.ok) throw new Error("Jeu introuvable")
    return res.json()
  })

export const createGame = (game) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game)
  })

export const deleteGame = (id) =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" })

export const updateGame = (id, game) =>
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game)
  })
