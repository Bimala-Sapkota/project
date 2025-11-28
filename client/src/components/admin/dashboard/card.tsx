import React from 'react'

interface IProps {
    label: string,
    count: number
}

const CountCard: React.FC<IProps> = ({ label, count }) => {
    return (
        <div className='bg-[#f8f8f8] h-[30] shadow p-4 border border-indigo-300 rounded-md'>

            <h1 className='text-xl font-bold text-indigo-800'>{label}</h1>
            <p className='mt-3 font-bold text-lg text-gray-800 text-end'>{count}</p>

        </div>
    )
}

export default CountCard