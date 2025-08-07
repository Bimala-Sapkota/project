import { useQuery } from "@tanstack/react-query";
import type { ICategory } from "../../../types/category.type";
import ComponentTitle from "../component-title-with-button";
import CategoryCard from "./category-card";
import { getAllCategory } from "../../../api/category.api";
import CategoryCardLoader from "../../loader/category-loader";

const CategoryList = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllCategory,
    queryKey: ["get_all_category"],
  });

  console.log(isLoading, data);

  return (
    <div className="mt-10 px-36">
      <ComponentTitle
        title="Browse Our Best Selling Product Categories"
        subTitle="Discover top-rated products by category loved by our customers."
      />
      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 12 }, (_, i: number) => i + 1).map((data) => (
              <CategoryCardLoader key={data} />
            ))
          : data?.data.map((category: ICategory) => (
              <CategoryCard key={category._id} category={category} />
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
