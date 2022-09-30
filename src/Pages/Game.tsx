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
                <ArrowCircleLeft size={70} className="text-white hover:text-purple-400 mob:absolute mob:left-10 mob:top-10"/>
            </Link>
            <Logo/>
            <div className="w-[100%] flex flex-col align-center items-center md:mt-8">
                <h1 className="text-3xl text-white font-black
                mob:text-4xl
                sm:text-5xl"
                >{games.filter(game => game.id === id).map(game => game.title)}</h1>
                <div className={duo.length >= 5?`grid grid-cols-1 gap-6 mt-10 mx-10
                sm:grid-cols-2
                md:grid-cols-3 
                xl:grid-cols-5
                place-items-center`: `flex justify-center mt-10 mx-10 gap-6 flex-col mob:flex-row`}
                >
                    {duo.map((ad) => (
                        <DuoCard
                        key={ad.id}
                        data={ad}
                        />
                    ))}
                </div>
            </div>
        </PageStructure>
    )
}