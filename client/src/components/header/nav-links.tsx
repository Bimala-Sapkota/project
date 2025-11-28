import { Link, useLocation } from 'react-router'

const navLinks = [
    {
        label: 'Home',
        link: '/',

    },
    {
        label: 'Products',
        link: '/products',
    },
    {
        label: 'About Us',
        link: '/about_us',
    }
    ,
    {
        label: 'Contact Us',
        link: '/contact_us',
    }

]

// arr.map
const NavLinks = () => {

    const location = useLocation()
    return (
        <div className='flex items-center gap-6'> 
            {
                navLinks.map((item)=>{
                    return(
                        <Link to={item.link}>
                            <span className={`text-lg font-[400] ${location.pathname === item.link ? 'font-[600] text-indigo-600' : ''}`}>{item.label}</span>
                        </Link>
                    )
                })

            }

        </div>
    )
}

export default NavLinks
