import NavBar from "../components/header";
import AllProductList from "../components/products/product_list";

const Products = () => {
  return (
    <main>
      <NavBar />
      <div className="px-36">
        <AllProductList />
      </div>
    </main>
  );
};

export default Products;
