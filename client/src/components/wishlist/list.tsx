import { useQuery } from "@tanstack/react-query"
import WishlistProductCard from "./card"
import { getWishlist } from "../../api/wishlist.api"
import type { IProductData } from "../../types/product.types"
import ProductCardLoader from "../loaders/product-loader"
import EmptyWishlist from "./empty-card"
import toast from "react-hot-toast"

const List = () => {


    // 1. api / query function
    const { isLoading, data ,error } = useQuery({
        queryFn: getWishlist,
        queryKey: ['get_wishlist']
    })
    // 2. use reactQuery useQuery hook to get  data/wishlist


    const arr = Array.from({ length: 15 }, (_, i) => `wishlist-cart-${i + 1}`)

    if(error){
        toast.error(error.message)
        return
    }

    return (
        <div className="w-full h-full">
            
            {
                !isLoading && data?.data?.data.length === 0 && <div className="h-full flex justify-center items-center">
                    <EmptyWishlist/>

                </div>
            }

            <div className="grid grid-cols-5 gap-6">
                {
                    isLoading ?

                        arr.map(data => <ProductCardLoader key={data} />)
                        :

                        data?.data?.data.map((product: IProductData) => <WishlistProductCard product={product} key={product._id} />)
                }
            </div>


        </div>
    )
}

export default List
