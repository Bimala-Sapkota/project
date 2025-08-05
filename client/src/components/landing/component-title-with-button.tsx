import type { FC } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router";

type IProps = {
  link?: string;
  title: string;
  subTitle: string;
};

const ComponentTitle: FC<IProps> = ({ title, subTitle, link }) => {
  return (
    <div className="flex justify-between mb-10 ga">
      <div>
        <h1 className="text-3xl font-bold text-[#A31621]">{title}</h1>
        <p className="text-gray-600 text-[14px] mt-2">{subTitle}</p>
      </div>
      {link && (
        <div>
          <Link className="flex items-center gap-1" to={link}>
            <p className="text-gray-600 text-[13px]">Explore All</p>
            <FaChevronRight
              size={12}
              className="text-gray-600 text-[13px] mb-0.5"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ComponentTitle;
