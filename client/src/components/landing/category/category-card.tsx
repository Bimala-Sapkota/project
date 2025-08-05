import { VscGroupByRefType } from "react-icons/vsc";
import type { ICategory } from "../../../types/category.type";

type IProps = {
  category: ICategory;
};

const CategoryCard = ({ category }: IProps) => {
  return (
    <div className="p-4 flex items-center gap-2 bg-[#f8f8f8] rounded-md">
      {/* Icon */}
      <div>
        <VscGroupByRefType size={30} className="text-[#A31621]" />
      </div>
      {/* Title & Subtitle */}
      <div>
        <p className="text-lg text-gray-900 font-bold">{category.name}</p>
        <p className="text-[12px] line-clamp-2 text-gray-600">
          {category.description ??
            "Surveillance cameras for security and monitoring."}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
