import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/">Accueil</Link> |{" "}
      <Link to="/about">A propos</Link>|{" "}
      <Link to="/games">Jeux</Link>
    </nav>
  )
}

export default Navbar