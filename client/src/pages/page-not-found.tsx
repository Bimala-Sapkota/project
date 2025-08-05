import { Link } from "react-router";

const NotFound = () => {
  return (
    <main className="flex  h-full justify-center items-center tracking-wider">
      <div className=" w-[500px] flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-[#A31621] text-center mb-4">
          OOPS!
        </h1>
        <h2 className="text-2xl text-gray-600 text-center">
          404! Page not found
        </h2>

        <p className="text-gray-600 mt-5 text-center">
          The page you are looking for is not found or moved permanently.
        </p>

        <Link to={"/"}>
          <button className="w-[200px] mt-20 bg-[#A31621] p-2 rounded-md text-white text-[16px] font-[500] cursor-pointer">
            Go to Home
          </button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
