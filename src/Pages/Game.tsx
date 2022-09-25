import { useParams } from 'react-router-dom'

import axios from "axios"
import { useEffect, useState } from "react"
import { DuoCard, DuoCardProps } from '../components/DuoCard';
import PageStructure from '../components/PageStructure';
import Grid from '../components/Grid';
import { GameProps } from './Home';


export function Game(){
    const { id } = useParams();
    
    const [duo, setDuos] = useState<DuoCardProps[]>([])

    useEffect(() => {
        axios(`http://localhost:3333/games/${id}/ads`)
        .then(response => setDuos(response.data))
    }, [])

    const [games, setGames] = useState<GameProps[]>([])
  
    useEffect(() => {
        axios('http://localhost:3333/games')
        .then(response => setGames(response.data))
    }, [])

    console.log(games)

    console.log(id)

    return (
        <PageStructure>
            <h1 className="text-4xl text-white font-black
            sm:text-5xl"
            >{games.filter(game => game.id === id).map(game => game.title)}</h1>
            <div className="grid grid-cols-1 gap-6 mt-10 mx-10
            sm:grid-cols-2
            md:grid-cols-3 
            xl:grid-cols-5">
                {duo.map((ad) => (
                    <DuoCard
                    key={ad.id}
                    data={ad}
                    />
                ))}
            </div>
        </PageStructure>
    )
}