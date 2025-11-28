import React from 'react'
import InfoSection from './info-section'
import QuickLinks from './quick-link'
import BottomFooter from './bottom-footer'

const Footer = () => {
  return (
    <div className='bg-black  py-20 xl:px-36 px-2'>
        <div className='flex flex-col md:flex-row justify-between'>
            <InfoSection/>
            <QuickLinks/>
        </div>
        <BottomFooter/>
    </div>
  )
}

export default Footer
