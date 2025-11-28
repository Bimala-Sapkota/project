import { Outlet } from 'react-router'
import AdminHeader from '../components/header/admin'
import { withAuth } from '../components/hoc/with-auth.hoc'
import { Role } from '../types/enums'
import SideBar from '../components/admin/side-bar'

const AdminLayout = () => {
    return (
        <main className='w-full h-full flex overflow-clip'>
            {/* sidebar  */}
            <div className='h-full w-[300px] border-r  border-blue-300 shadow  px-1'>
                <SideBar/>
            </div>
            <div className='min-h-full w-full'>

                {/* nav bar */}
                <div className='w-full border-b border-blue-300 shadow'>
                   <AdminHeader/>
                </div>

                {/* page content */}
                <div className='p-6  overflow-scroll h-full'>
                    <Outlet />
                </div>

            </div>


        </main>
    )
}

const AdminPanel =  withAuth(AdminLayout,[Role.ADMIN])

export default AdminPanel