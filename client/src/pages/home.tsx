import NavBar from "../components/header";
import FeaturedProducts from "../components/landing/feature-products";
import Hero from "../components/landing/hero";
import MostSale from "../components/landing/most-sale";
import SummerSale from "../components/landing/summer-sale";
import ProductCard from "../components/product/card";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <FeaturedProducts />
      <ProductCard />
      <MostSale />
      <SummerSale />
    </div>
  );
};
export default HomePage;
