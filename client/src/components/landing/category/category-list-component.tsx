import type { ICategory } from "../../../types/category.type";
import ComponentTitle from "../component-title-with-button";
import CategoryCard from "./category-card";
import { getAllCategory } from "../../../api/category.api";
import { useQuery } from "@tanstack/react-query";
import CategoryCardLoader from "./category-loader";

const CategoryList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get_all_category"],
    queryFn: getAllCategory,
  });

  console.log(isLoading, data);

  return (
    <div className="mt-10 px-36">
      <ComponentTitle
        title="Browse Our Best Selling Product Categories"
        subTitle="Discover top-rated products by category loved by our customers."
      />
      <div className="grid grid-cols-4 gap-6">
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((data) => (
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
