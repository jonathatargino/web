import { DuoInfo } from "./DuoInfo";
import { MatchModal } from "./MatchModal";

export interface DuoCardProps {
    id: string;
    name: string;
    yearsPlaying: number;
    weekDays: string[];
    hourEnd: string;
    hourStart: string;
    useVoiceChannel: boolean;
}

interface Props {
    data: DuoCardProps;
}

export function DuoCard({data}: Props){
    return (
        <div className="w-[230px] bg-[#2A2634] rounded-lg py-5 px-8 mr-4 items-center">
            <DuoInfo
            label="Nome"
            value={data.name}
            />

            <DuoInfo
            label="Tempo de jogo"
            value={`${data.yearsPlaying} anos`}
            />

            <DuoInfo
            label="Disponibilidade"
            value={`${data.weekDays.length} dias | ${data.hourStart} - ${data.hourEnd}`}
            />

            <DuoInfo
            label="Chamada de áudio?"
            value={data.useVoiceChannel? 'Sim' : 'Não'}
            />
            <MatchModal matchUserId={data.id}/>
        </div>
    )
}