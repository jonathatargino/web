import axios from "axios"
import { useEffect, useState } from "react"
import { CreateAdModal } from "../components/CreateAdModal"
import { GameBanner } from "../components/GameBanner"
import Grid from "../components/Grid"
import PageStructure from "../components/PageStructure"


export interface GameProps {
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

            <Grid>
                {games.map(game => {
                    return (
                    <GameBanner 
                    key={game.id}
                    id={game.id}
                    bannerUrl={game.bannerUrl} 
                    title={game.title} 
                    adsCount={game._count.ads}
                    />
                    )
                })}
            </Grid>
    <CreateAdModal />
  </PageStructure>
    )
}