import axios from "axios"
import { useEffect, useState } from "react"
import { CreateAdModal } from "../components/CreateAdModal"
import { GameBanner } from "../components/GameBanner"
import PageStructure from "../components/PageStructure"

interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count:{
      ads: number,
    },
  }

export function Home(){

    const [games, setGames] = useState<Game[]>([])
  
    useEffect(() => {
        axios('http://localhost:3333/games')
        .then(response => setGames(response.data))
    }, [])

    return (
        <PageStructure>
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
  </PageStructure>
    )
}