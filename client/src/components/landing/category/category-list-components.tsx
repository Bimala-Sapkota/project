// import { useQuery } from "@tanstack/react-query";
// import type { ICategoryData } from "../../../types/category.types";
// import ComponentTitle from "../conponent-title-with-button";
// import CategoryCard from "./category-card";
// import { getAllCategory } from "../../../api/category.api";
// import CategoryCardLoader from "../../loaders/category-loader";

// const CategoryList = () => {
//   const { data, isLoading } = useQuery({
//     queryFn: getAllCategory,
//     queryKey: ["get_all_category"],
//   });
//   console.log(data);
//   console.log(isLoading, data);

//   return (
//     <div className="mt-10 px-4 lg:px-36">
//       <ComponentTitle
//         title="Browse Our Best Selling Product Categories"
//         subTitle="Discover top-rated products by category loved by our customers."
//       />
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
//         {isLoading
//           ? Array.from({ length: 12 }, (_, i: number) => i + 1).map((data) => (
//               <CategoryCardLoader key={data} />
//             ))
//           : data?.data.map((category: ICategoryData) => (
//               <CategoryCard key={category._id} category={category} />
//             ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryList;

// components/CategoryList.tsx

import { useQuery } from "@tanstack/react-query";
import type { ICategoriesResponse } from "../../../types/category.types"; // Adjust import path as necessary
import ComponentTitle from "../conponent-title-with-button";
import CategoryCard from "./category-card"; // Import your card component
import { getAllCategory } from "../../../api/category.api"; // Import the API function
//import NotFoundComponent from "../common/not-found-card/not-found"; // For handling no results

const CategoryList = () => {
  const { data, isLoading, isError } = useQuery<ICategoriesResponse>({
    queryKey: ["get_all_category"],
    queryFn: getAllCategory,
  });

  if (isError) {
    return <div>Error loading categories...</div>;
  }

  const categories = data?.data || []; // Safely extract categories

  return (
    <div className="mt-10 px-4 lg:px-36">
      <ComponentTitle
        title="Browse Our Best Selling Product Categories"
        subTitle="Discover top-rated products by category loved by our customers."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="loader">
                Loading...
              </div> // Placeholder for loading
            ))
          : //  categories.length === 0 ? (
            //   <NotFoundComponent message="No categories found." />
            // ) :
            categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
