import { Link } from "react-router"
import RegisterForm from "../../components/forms/auth/register-form"

const Register  = () =>{

    return (
         <main className='h-full flex flex-col items-center justify-center p-3 tracking-wider'>
            <div className='border border-blue-500 w-[min(100%,600px)]  px-4 py-6 rounded-md shadow-md '>
                {/* page heading */}
                <h1 className='text-3xl font-extrabold text-center text-gray-800 mb-6'>Sign Up</h1>
                {/* login form */}
                <div>
                    <RegisterForm/>
                </div>

                <div className='mt-3 text-center '>
                    <p>Already have an account? <Link to={'/login'}><span className='text-indigo-700 font-bold '>Sign In</span></Link></p>
                </div>

            </div>                 
        </main>
    )
}
export default Register