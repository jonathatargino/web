interface DuoInfoProps {
    label: string;
    value: string;
}

export function DuoInfo({label, value}: DuoInfoProps){

    return(
        <div className="w-[100%] mb-4">
            <h3 className="text-[#D4D4D8]">{label}</h3>
            <span className="text-zinc-400">{value}</span>
        </div>
    )
}