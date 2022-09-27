import * as Dialog from '@radix-ui/react-dialog'
import { MatchButton } from "./MatchButton";

export function MatchModal(){
    return (
        <Dialog.Root>
            <MatchButton/>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 xl:py-6 text-white   
                top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 
                rounded-lg w-[480px] shadow-lg shadow-black/25">
                    <Dialog.Title>
                        <h1 className="text-4xl font-bold">Let's play</h1>
                        <h2>Agora é só começar a jogar!</h2>
                        </Dialog.Title>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}