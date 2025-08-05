import ProductCard from "../product/card";
import ComponentTitle from "./component-title-with-button";

const SummerSale = () => {
  return (
    <div className="mt-10 px-36">
      <ComponentTitle
        title="Summer Sale"
        subTitle="special summer sale"
        key={"summer_sale_component_title"}
        link="#"
      />
      <div className="mt-4 flex flex-wrap gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
          return <ProductCard />;
        })}
      </div>
    </div>
  );
};

export default SummerSale;
