import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'

export function MatchButton(){
    return (
        <Dialog.Trigger className="w-[100%] h-9 bg-[#8B5CF6] rounded flex flex-row justify-center items-center text-white">
            <GameController size={24} className="mr-2"/>
            Conectar
        </Dialog.Trigger>
    )
}