import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import axios from 'axios'
import { UserFormData } from '../types/user'

import { CreateAdBanner } from "./CreateAdBanner";
import { Check, GameController } from 'phosphor-react'
import { useEffect, useState, FormEvent } from 'react';

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputError } from './InputError';

const validationSchema = yup.object({
  game: yup.string().required(),
  name: yup.string().required(),
  yearsPlaying: yup.number().required().min(0),
  discord: yup.string().required().matches(/^.{3,32}#[0-9]{4}$/),
  hourStart: yup.string().required(),
  hourEnd: yup.string().required(),
})

export function CreateAdModal(){

  interface Game {
    id: string,
    title: string,
  }

  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)


  useEffect(() => {
    axios(`${import.meta.env.VITE_URL_BASE}/games`)
    .then(response => setGames(response.data))
  }, [])

  async function handleCreateAd(data: UserFormData){

    reset()

    if(weekDays.length < 1){
      alert("Selecione no mínimo um dia da semana!")
      return
    }

    try {
      await axios.post(`${import.meta.env.VITE_URL_BASE}/games/${data.game}/ads`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel: useVoiceChannel
    })

    alert("Anuncio criado com sucesso!")
    } catch (err){
      console.log(err)
      alert("Erro ao criar o anuncio")
    }
    
  }

  function onError(error: any){
    console.log('erro: ', error)
  }


  const { register, handleSubmit, reset, formState: {errors} } = useForm({
    resolver: yupResolver(validationSchema)
  })

    return (
        <Dialog.Root>
        <CreateAdBanner />
  
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
  
          <Dialog.Content 
          className="fixed bg-[#2A2634] py-4 px-6 mob:py-8 mob:px-10 xl:py-6 text-white   
          top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 
          rounded-lg w-[300px] mobm:w-[360px] mob:w-[480px] shadow-lg shadow-black/25
          overflow-y-auto max-h-[550px] xl:max-h-[640px]
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-900 scrollbar-thumb-rounded">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
              <form onSubmit={handleSubmit(handleCreateAd, onError)} className="mt-8 flex flex-col gap-4">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game?</label>
                  <select
                  className="bg-zinc-900 py-3 px-4 rounded mob:text-sm text-[12px] appearance-none"
                  {...register('game')}
                  id="game"
                  defaultValue=""
                  >
                    <option value="" 
                    disabled 
                    selected
                    >Selecione o game que deseja jogar</option>
                    {games.map(game => {
                      return (
                        <option key={game.id} value={game.id}>{game.title}</option>
                      )
                    })}
                  </select>
                  {errors.game?.type && <InputError type={errors.game.type} field="game"/>}
                </div>
  
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <input 
                    className="bg-zinc-900 py-3 px-4 rounded mob:text-sm placeholder:text-zinc-500 text-[12px] appearance-none"
                    id="name" 
                    placeholder="Como te chamam dentro do game?"
                    autoComplete="off"
                    spellCheck="false"
                    {...register('name')}
                    />
                    {errors.name?.type && <InputError type={errors.name.type} field="name"/>}
                </div>
  
                <div className="mob:grid mob:grid-cols-2 mob:gap-6">
                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <input
                      className="bg-zinc-900 py-3 px-4 rounded mob:text-sm placeholder:text-zinc-500 text-[12px] appearance-none"  
                      id="yearsPlaying" 
                      placeholder="Tudo bem ser ZERO"
                      autoComplete="off"
                      {...register('yearsPlaying')}
                      />
                      {errors.yearsPlaying?.type && <InputError type={errors.yearsPlaying.type} field="yearsPlaying" />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <input
                      className="bg-zinc-900 py-3 px-4 rounded mob:text-sm placeholder:text-zinc-500 text-[12px] appearance-none"
                      id="discord" 
                      placeholder="Usuário#0000"
                      autoComplete="off"
                      spellCheck="false"
                      {...register('discord')}
                      />
                      {errors.discord?.type && <InputError type={errors.discord.type} field="discord" />}
                  </div>
                </div>
  
                <div className="mob:flex mob:gap-6">
                  <div className="flex flex-col gap-2 mb-4 mob:mb-0">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <ToggleGroup.Root 
                    className="grid grid-cols-4 gap-2"
                    type="multiple"
                    value={weekDays}
                    onValueChange={setWeekDays}
                    >
                      <ToggleGroup.Item  
                      value="0"
                      title="Domingo"
                      className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        D
                      </ToggleGroup.Item>
                      <ToggleGroup.Item  
                      value="1"
                      title="Segunda"
                      className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item  
                      value="2"
                      title="Terça"
                      className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        T
                      </ToggleGroup.Item>
                      <ToggleGroup.Item  
                      value="3"
                      title="Quarta"
                      className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item  
                      value="4"
                      title="Quinta"
                      className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item  
                      value="5"
                      title="Sexta"
                      className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item  
                      value="6"
                      title="Sábado"
                      className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        S
                      </ToggleGroup.Item>
                      </ToggleGroup.Root>
                  </div>
  
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="mob:grid mob:grid-cols-2 mob:gap-1 flex flex-col gap-2">
                      <input
                        className="text-center block bg-zinc-900 py-3 px-4 rounded mob:text-sm placeholder:text-zinc-500 removeClock"
                        id="hourStart" 
                        type="time" 
                        placeholder="De"
                        autoComplete="off"
                        {...register('hourStart')}
                      />
                      <input
                        className="text-center bg-zinc-900 py-3 px-4 rounded mob:text-sm placeholder:text-zinc-500 removeClock"
                        id="hourEnd" 
                        type="time" 
                        placeholder="Até"
                        autoComplete="off"
                        {...register('hourEnd')}
                        />
                    </div>
                  </div>
                </div>
                <div
                className="m-auto">
                  <div>
                    {errors.hourStart?.type && <InputError type={errors.hourStart.type} field="hourStart" />}
                  </div>
                  {errors.hourEnd?.type && <InputError type={errors.hourEnd.type} field="hourEnd"/>}
                </div>
  
                <label className="mt-2 flex gap-2 mob:text-sm items-center">
                  <Checkbox.Root 
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => {
                    if (checked === true){
                      setUseVoiceChannel(true)
                    }else {
                      setUseVoiceChannel(false)
                    }
                  }}
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                  >
                    <Checkbox.Indicator>
                      <Check className="w-4 h-4 text-emerald-400"/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                </label>
  
                <footer className="mt-4 flex flex-col mob:flex-row mob:justify-end gap-4">
                  <Dialog.Close 
                  type="button"
                  className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
                  onClick={() => reset()}
                  >
                    Cancelar
                  </Dialog.Close >
                  <button 
                  type="submit"
                  className="bg-violet-500  hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center justify-center gap-3"
                  >
                    <GameController className="w-6 h-6"/>
                    Encontrar duo</button>
                </footer>
  
              </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
}