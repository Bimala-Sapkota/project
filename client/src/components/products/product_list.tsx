import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/product.api";
import ProductCardLoader from "../loader/product-loader";
import ProductCard from "../poducts/card";
import type { IProductData } from "../../types/product.type";
import NotFoundComponent from "../common/not-found-card/not-found";

const AllProductList = () => {
  const { isLoading, data } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["get_all_products"],
  });

  const arr = Array.from({ length: 12 }, (_, i) => `product-list-${i + 1}`);
  //
  return (
    <div>
      {!isLoading && data.data.data.length === 0 && (
        <div className="w-full h-full flex justify-center items-center mt-10">
          <NotFoundComponent />
        </div>
      )}
      <div className="grid grid-cols-5 gap-y-6">
        {isLoading
          ? arr.map((val) => <ProductCardLoader key={val} />)
          : data.data.data.map((product: IProductData) => (
              <ProductCard product={product} key={product._id} />
            ))}
      </div>
    </div>
  );
};

export default AllProductList;
