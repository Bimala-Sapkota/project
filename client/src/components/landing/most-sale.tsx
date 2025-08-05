import ProductCard from "../product/card";
import ComponentTitle from "./component-title-with-button";

const MostSale = () => {
  return (
    <div className="mt-10 px-36">
      <ComponentTitle
        title="2 weeks most sale"
        subTitle="2 weeks most sale products"
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

export default MostSale;
