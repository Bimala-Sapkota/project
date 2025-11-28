import { VscGroupByRefType } from "react-icons/vsc";
import type { ICategoryData } from "../../../types/category.types";

type IProps = {
  category:ICategoryData
}

const CategoryCard = ({category}:IProps) => {
  return (
    <div className="p-4 flex items-center gap-2 bg-[#f8f8f8] rounded-md">
      {/* icon */}
      <div>
        <VscGroupByRefType size={30} className="text-[#A31621]"/>
      </div>
      {/* title & sub title */}
      <div>
        <p className="text-lg text-gray-900 font-bold">{category.name}</p>
        <p className="text-[12px] line-clamp-2 text-gray-600">{category.description ?? '-'}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
