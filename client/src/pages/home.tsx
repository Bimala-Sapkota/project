import CategoryList from "../components/landing/category/category-list-components"
import FeaturedProducts from "../components/landing/feraured-products"
import Hero from "../components/landing/hero"
import MostSale from "../components/landing/most-sale"
import SummerSale from "../components/landing/summer-sale"


const HomePage = () =>{

    return (
        <main>
            <Hero/>
            <CategoryList/>
            <FeaturedProducts/>
            <MostSale/>
            <SummerSale/>
        </main>
    )

}


export default HomePage
