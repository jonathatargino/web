import axios from "axios"
import { useEffect, useState } from "react"
import { CreateAdModal } from "../components/CreateAdModal"
import { GameBanner } from "../components/GameBanner"
import Grid from "../components/Grid"
import { Logo } from "../components/Logo"
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
    console.log(`${import.meta.env.VITE_URL_BASE}/games`)
    const [games, setGames] = useState<GameProps[]>([])
  
    useEffect(() => {
        axios(`${import.meta.env.VITE_URL_BASE}/games`)
        .then(response => setGames(response.data))
    }, [])

    return (
        <PageStructure>
            <Logo/>
            <h1 className="text-3xl text-white font-black
            mob:text-4xl
            sm:text-5xl
            md:text-6xl
            md:mt-8"
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