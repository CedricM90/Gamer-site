import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Games from "./pages/Games"
import GameDetails from "./pages/GameDetails"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import AddGame from "./pages/AddGame"
import EditGame from "./pages/EditGame"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<About />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/add" element={<AddGame />} />
        <Route path="/games/:id/edit" element={<EditGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App