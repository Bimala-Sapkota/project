import { Link } from "react-router";
import RegisterForm from "../../components/forms/auth/register-form";

const Register = () => {
  return (
    <main className="  flex  flex-col items-center justify-center h-screen bg-gray-100">
      <div className="border border-blue-500 w-full max-w-md px-4 py-6 rounded-md shadow-lg bg-white">
        {/* Page heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h1>
        {/* login form */}
        <div>
          <RegisterForm />
        </div>

        <div className="mt-3 text-center ">
          <p>
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-indigo-700 font-bold ">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
export default Register;
