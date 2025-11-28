
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToWishlist } from '../../api/wishlist.api';
import type { IProductData } from '../../types/product.types'
import { GoTrash } from "react-icons/go";
import toast from 'react-hot-toast';
// define props type
type IProps = {
    product: IProductData
}



const WishlistProductCard = ({product}:IProps) => {
    // console.log(product)
const queryClient = useQueryClient()
    // * mutation for add to wishlist
    const {mutate,isPending} = useMutation({
        mutationFn:addToWishlist,
        mutationKey:['add_to_wishlist'],
        onSuccess:(response) =>{
            console.log(response)
            toast.success(response.message)
            queryClient.invalidateQueries({queryKey:['get_wishlist']})
        },
        onError:(error)=>{
            toast.error(error?.message || 'Something went wrong')
        }
    })

    const handleClick = () =>{

            mutate(product._id)
        
    }

    // if(isPending){
        
    // }

    return (
        <div className='relative max-w-[300px] flex flex-col p-4 py-8 bg-[#f8f8f8] rounded-md'>

            <div  className={`absolute top-4 right-4 w-fit h-fit ${isPending ? "cursor-not-allowed" : 'cursor-pointer'} z-50`}>
                {isPending ? <span className='text-sm text-[#A31621] z-50 '>Removing</span> :<GoTrash onClick={handleClick} size={22} className='text-red-500' />}
            </div>

            {/* image */}
            <div className='max-h-[180px] w-[180px]  mx-auto cursor-pointer'>
                <img
                    // cover_image
                    src={product?.coverImage?.path}
                    alt='Product Image'
                    className='h-full w-full object-fill rounded-md  hover:scale-110 transition-all duration-300 hover:grayscale-40'
                />

            </div>

            <div className='mt-5'>
                {/* product.name */}
                <h1 className='text-[#A31621] font-bold text-[16px] line-clamp-1'>
                    {product?.name}
                </h1>
                {/* product.description */}
                <p className='text-[12px] mt-2 line-clamp-2'>
                    {product.description}
                </p>
            </div>
            <div className='flex mt-2 justify-between text-lg'>
                {/* price */}
                <p className='text-[14px]'>{new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(product?.price ?? 12345)}</p>
                {/* stock */}
                <p>stock: <span className='text-green-500  text-[14px]'>5</span></p>

            </div>
            <div className=' flex justify-between mt-5 gap-3'>
                <button  className=' bg-[#A31621] w-full p-2 rounded-md text-white text-[16px] font-[500] cursor-pointer'>
                    View Detail
                </button>
            </div>

        </div>
    )
}

export default WishlistProductCard



// app    store / context ={count,user}

// comp A comp B .... compZ

// comp A 
// count = 1
// user 

// com B 

// com c
// .....


// comp Z 


// context api
// redux 
// mobX
// zustland


// user  -> context 
//  user, token 
// provider 
// consumer