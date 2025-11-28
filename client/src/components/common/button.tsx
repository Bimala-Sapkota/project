import type { FC } from "react"



interface IProps {
    label:string,
    type?: 'submit' | 'button' | 'reset',
    isDisabled?: boolean
}

const Button: FC<IProps> = ({ label, type = 'button', isDisabled = false }) => {
    return (
        <div>
            <button
                disabled={isDisabled}
                className="disabled:cursor-not-allowed disabled:bg-indigo-500 tracking-wider w-full p-3 rounded-md text-lg font-bold text-white cursor-pointer bg-indigo-600 hover:bg-indigo-800  transition-all duration-300"
                type={type}
            > {label} </button>
        </div>
    )
}

export default Button
