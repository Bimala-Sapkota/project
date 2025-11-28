import React from 'react'

type IProps ={
    Icon:React.ReactElement;
    title:string;
    detail:string

}

const ContactCard:React.FC<IProps> = ({Icon,title,detail}) => {
  return (
    <div className='w-full'>
      <div className='flex justify-center lg:justify-start'>
         {Icon}
      </div>
        <div className='mt-2 text-center lg:text-start'>
            <p className='text-[14px] lg:text-[12px] 3xl:text-[13px] font-[200] text-secondary-white'>{title}</p>
            <p className='text-[14px] lg:text-[14px] 3xl:text-[16px] font-[500] text-secondary-white'>{detail}</p>
        </div>
      
    </div>
  )
}

export default ContactCard
