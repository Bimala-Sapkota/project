import Footer from "../components/footer";
import NavBar from "../components/header";
import CategoryList from "../components/landing/category/category-list-component";
import FeaturedProducts from "../components/landing/feature-products";
import Hero from "../components/landing/hero";
import MostSale from "../components/landing/most-sale";
import SummerSale from "../components/landing/summer-sale";

const HomePage = () => {
  return (
    <main>
      <main>
        <NavBar />
        <Hero />
        <CategoryList />
        <FeaturedProducts />
        <MostSale />
        <SummerSale />
        <Footer />
      </main>
    </main>
  );
};
export default HomePage;
