interface DuoInfoProps {
    label: string;
    value: string;
    colorValue?: string;
}

export function DuoInfo({label, value, colorValue}: DuoInfoProps){

    return(
        <div className="w-[100%] mb-4">
            <h3 className="text-[#D4D4D8]">{label}</h3>
            <span className={colorValue?`text-[${colorValue}]`:`text-zinc-400`}>{value}</span>
        </div>
    )
}