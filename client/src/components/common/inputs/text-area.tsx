import { type FC } from "react"
import { LuAsterisk } from "react-icons/lu";
import { useFormContext } from 'react-hook-form'

interface IProps {
    label: string,
    type?: 'text' | 'number' | 'email' | 'password',
    name: string,
    id: string,
    placeholder: string,
    required?: boolean,
}


const TextArea: FC<IProps> = ({ id, label, name, placeholder, required = false }) => {

    const { register, watch, formState: { errors } } = useFormContext();



    return (
        <div className="flex flex-col gap-1 w-full ">
            {/* label */}
            <div className="flex">
                <label
                    className="text-lg font-bold text-gray-800"
                    htmlFor={id}
                >{label}</label>
                {required && <LuAsterisk size={12} className="text-red-500 mt-1" />}
            </div>
            {/* textarea input */}
            <div className="w-full flex items-center ">
                <textarea
                    {...register(name)}
                    value={watch(name)}
                    className={
                        `bg-white min-h-[200px] w-full border  ${errors[name] ? 'border-red-500 focus:outline-red-500' : 'border-blue-500 focus:outline-blue-500'}
                     p-3 rounded-md placeholder:text-lg text-lg `
                    }
                    placeholder={placeholder}
                    id={id}
                />


            </div>

            <p className=" text-[12px] text-red-500 h-[8px] mt-6">{errors[name] ? errors[name]?.message as string : ' '}</p>
        </div>
    )
}

export default TextArea
