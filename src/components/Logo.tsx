import logoImg from '../assets/logo-nlw-esports.svg'

export function Logo(){
    return (
        <img src={logoImg} alt="NLW Logo" 
        className="w-[200px] mb-2 mob:w-[250px] 2xl:w-[500px]"
    />
    )
}