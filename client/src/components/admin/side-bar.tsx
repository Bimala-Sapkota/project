


import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineBrandingWatermark ,MdProductionQuantityLimits} from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";
import { Link, useLocation } from 'react-router';

const sidebarLinks = [
    {
        label: 'Dashboard',
        link: '/admin',
        icon: <LuLayoutDashboard size={24} />
    },
    {
        label: 'Category',
        link: '/admin/category',
        icon: <SlTag size={24} />
    },
    {
        label: 'Brands',
        link: '/admin/brands',
        icon: <MdOutlineBrandingWatermark size={24} />
    },
    {
        label: 'Products',
        link: '/admin/products',
        icon: <MdProductionQuantityLimits size={24} />
    },
    {
        label: 'Users',
        link: '/admin/users',
        icon: <PiUsersThreeBold size={24} />
    },
    {
        label: 'Orders',
        link: '/admin/orders',
        icon: <FaListCheck size={24} />
    }
]

const SideBar = () => {
    const location = useLocation()
    console.log(location)

    return (
        <aside>
            {/* logo */}
            <div className='flex items-center gap-4'>
                <div>
                    <img
                        src={"./logo.png"}
                        alt="logo image"
                        className="object-cover h-20"
                    />
                </div>
                <p className='text-xl font-bold italic text-indigo-700'>Shop Kart</p>
            </div>
            {/* sidebar navigation */}
            <div className='flex flex-col gap-1'>
                {
                    sidebarLinks.map((item) => {
                        const isActive = item.link === location.pathname
                        return(<Link to={item.link}>
                            <div className={`flex items-center gap-2 px-2 hover:bg-blue-500 group  
                                ${isActive ? "bg-blue-600 group text-white" :'text-blue-700'} py-3 rounded-sm`}>
                                <div className={`text-blue-600 group-hover:text-white
                                     ${isActive ? "text-white" : 'text-blue-700'}`}>{item.icon}</div>
                                <p className='text-lg font-semibold  group-hover:text-white'>{item.label}</p>
                            </div>
                        </Link>)
                    })
                }

            </div>


        </aside>
    )
}

export default SideBar