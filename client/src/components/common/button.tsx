import type { FC } from "react";

interface IProps {
  label: string;
  type?: "submit" | "button" | "reset";
  isDisable?: boolean;
}

const Button: FC<IProps> = ({ label, type = "button", isDisable = false }) => {
  return (
    <div>
      <button
        className="bg-indigo-600 hover:bg-indigo-800 transition-all duration-300 w-full p-2.5 rounded-md font-bold text-lg text-white cursor-pointer mt-4"
        type={type}
        disabled={isDisable} // Utilize the isDisable prop
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
