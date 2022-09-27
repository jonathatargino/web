import * as Dialog from '@radix-ui/react-dialog'
import { MatchButton } from "./MatchButton";
import { CheckCircle, X } from 'phosphor-react';

export function MatchModal(){
    
    return (
        <Dialog.Root>
            <MatchButton/>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 xl:py-6 text-white   
                top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 
                rounded-lg w-[400px] shadow-lg shadow-black/25
                flex flex-col items-center">
                    <Dialog.Close type="button" className="self-end">
                        <X size={30} color="#71717A"/>
                    </Dialog.Close>
                    
                    <Dialog.Title className="mb-8 flex flex-col items-center">
                        <CheckCircle size={64} weight="bold" color="#34D399" className="my-4"/>
                        <h1 className="text-4xl font-bold">Let's play!</h1>
                        <h2 className="text-zinc-400">Agora é só começar a jogar!</h2>
                        </Dialog.Title>
                        <h2 className="font-bold">Adicione seu discord</h2>
                        <h2 className="py-2 px-20 bg-[#121214] my-4 rounded">discord#0000</h2>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}