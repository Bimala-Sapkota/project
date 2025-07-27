import LoginForm from "../../components/forms/auth/login-form";
import { Link } from "react-router";

const Login = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border border-blue-500 w-full max-w-md px-4 py-6 rounded-md shadow-lg bg-white">
        {/* Page heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        {/* Login form */}
        <div>
          <LoginForm />
        </div>

        <div className="mt-3 text-center">
          <p>
            Do not have an account?
            <Link to="/register" className="text-indigo-700 font-bold">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            <span className="text-indigo-700 font-bold cursor-pointer">
              Forgot Password?
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
