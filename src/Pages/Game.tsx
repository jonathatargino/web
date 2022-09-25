import { useParams } from 'react-router-dom'

import axios from "axios"
import { useEffect, useState } from "react"
import { DuoCard, DuoCardProps } from '../components/DuoCard';
import PageStructure from '../components/PageStructure';
import Grid from '../components/Grid';


export function Game(){
    const { id } = useParams();
    
    const [duo, setDuos] = useState<DuoCardProps[]>([])

    useEffect(() => {
        axios(`http://localhost:3333/games/${id}/ads`)
        .then(response => setDuos(response.data))
    }, [])

    console.log(id)

    return (
        <PageStructure>
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