import productImage from "../../assets/product.webp";

const ProductCard = () => {
  return (
    <div className="max-w-[300px] flex flex-col p-4 py-8 bg-[#f8f8f8] rounded-md">
      {/* image */}
      <div className="max-h-[100px] w-[100px]  mx-auto cursor-pointer">
        <img
          src={productImage}
          alt="Product Image"
          className="h-full w-full object-contain  hover:scale-110 transition-all duration-300 hover:grayscale-40"
        />
      </div>

      <div className="mt-5">
        <h1 className="text-[#A31621] font-bold text-lg line-clamp-1">
          ThinkBook 16 Gen 7(16,AMD)
        </h1>
        <p className="text-[14px] mt-2 line-clamp-2">
          16" WUXGA | Ryzen 7000 | 16GB RAM | 512GB SSD | Radeon Graphics
          Intelcd Xeon E-2336 | 32GB RAM | 1TB NVMe SSD | Remote Management
        </p>
      </div>
      <div className="flex mt-2 justify-between text-lg">
        <p>Rs.124908</p>
        <p>
          stock: <span className="text-green-500 ">5</span>
        </p>
      </div>
      <div className=" flex justify-between mt-5 gap-3">
        <button className="bg-[#A31621] w-full p-2 rounded-md text-white text-[16px] font-[500] cursor-pointer">
          View Detail
        </button>
        <button className="border border-[#A31621]  w-full p-2 px-1 rounded-md text-[#A31621] text-[16px] font-[500] cursor-pointer">
          Add to wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
