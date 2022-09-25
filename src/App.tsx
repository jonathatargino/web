import './styles/main.css'

import { Home } from './Pages/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Game } from './Pages/Game'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/game/:id" element={<Game />}/>
      </Routes>
    </Router>
  )
}

export default App
