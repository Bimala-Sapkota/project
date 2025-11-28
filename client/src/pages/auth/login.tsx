import { Link } from 'react-router'
import LoginForm from '../../components/forms/auth/login-form'

const Login  = () =>{

    return (
        <main className='h-full flex flex-col items-center justify-center p-3 tracking-wider'>
            <div className='border border-blue-500 w-[min(100%,500px)]  px-4 py-6 rounded-md shadow-md '>
                {/* page heading */}
                <h1 className='text-3xl font-extrabold text-center text-gray-800 mb-6'>Login</h1>
                {/* login form */}
                <div>
                    <LoginForm/>
                </div>

                <div className='mt-3 text-center '>
                    <p>Do not have an account? <Link to={'/sign-up'}><span className='text-indigo-700 font-bold '>Sign Up</span></Link></p>
                </div>

            </div>                 
        </main>
    )
}
export default Login