import { Link } from "react-router"

const EmptyWishlist = () => {
  return (
    <div className="">
        <h2 className="text-lg tracking-wider max-w-[500px] text-center">
            You have&apos;t added any items to your wishlist yet. Start exploring and add your favorite products!
        </h2>
        <div className="w-[200px] mt-6 mx-auto ">
            <Link 
             to={'/'}
             className="tracking-wider w-full p-3 px-5 rounded-md text-lg font-bold text-white cursor-pointer bg-indigo-600 hover:bg-indigo-800  transition-all duration-300"
             >
                    Shop Now
            </Link>

            
        </div>
    </div>
  )
}

export default EmptyWishlist