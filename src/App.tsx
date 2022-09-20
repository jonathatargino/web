import { useState, useEffect } from 'react'

import './styles/main.css'

import axios from 'axios'

import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdModal } from './components/CreateAdModal'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count:{
    ads: number,
  },
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(response => setGames(response.data))
  }, [])




  return (
  <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-5
  2xl:my-10">
    <img src={logoImg} alt="" 
    className="w-[250px] mb-2"
    />
    <h1 className="text-4xl text-white font-black
    sm:text-5xl
    md:text-6xl"
    >
       Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
    </h1>

    <div className="grid grid-cols-1 gap-6 mt-10 mx-10
      sm:grid-cols-2
      md:grid-cols-3 
      xl:grid-cols-6"
      >
      {games.map(game => {
        return (
          <GameBanner 
          key={game.id}
          bannerUrl={game.bannerUrl} 
          title={game.title} 
          adsCount={game._count.ads}
          />
        )
      })}
    </div>
    <CreateAdModal />
  </div>
  )
}

export default App
