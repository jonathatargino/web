import { useParams } from 'react-router-dom'

import axios from "axios"
import { useEffect, useState } from "react"
import { DuoCard, DuoCardProps } from '../components/DuoCard';
import PageStructure from '../components/PageStructure';
import Grid from '../components/Grid';
import { GameProps } from './Home';
import {ArrowCircleLeft} from 'phosphor-react'
import { Logo } from '../components/Logo';
import { Link } from 'react-router-dom'


export function Game(){
    const { id } = useParams();
    
    const [duo, setDuos] = useState<DuoCardProps[]>([])

    useEffect(() => {
        axios(`${import.meta.env.VITE_URL_BASE}/games/${id}/ads`)
        .then(response => setDuos(response.data))
    }, [])

    const [games, setGames] = useState<GameProps[]>([])
  
    useEffect(() => {
        axios(`${import.meta.env.VITE_URL_BASE}/games`)
        .then(response => setGames(response.data))
    }, [])

    return (

        <PageStructure>
            <Link to="/">
                <ArrowCircleLeft size={70} className="text-white hover:text-purple-400 absolute left-10 top-10"/>
            </Link>
            <Logo/>
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