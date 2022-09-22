import errors from '../utils/errors.json'

interface InputErrorProps {
    type: any;
    field: string;
}

export function InputError({ type, field }: InputErrorProps){
    // @ts-expect-error
    return <span className="text-[12px] text-[#df2c14]">{errors[field][type]}</span>
}