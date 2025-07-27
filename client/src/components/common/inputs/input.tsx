import { useState, type FC } from "react";
import { LuAsterisk } from "react-icons/lu";
import { useFormContext } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

interface IProps {
  label: string;
  type?: "text" | "number" | "email" | "password";
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
}

const Input: FC<IProps> = ({
  id,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1">
      {/* label*/}
      <div className=" flex">
        <label className="text-lg font-bold text-gray-800" htmlFor={id}>
          {label}
        </label>
        {required && <LuAsterisk size={12} className="text-red-500 mt-1" />}
      </div>

      {/* input*/}
      <div className="w-full flex items-center  relative mt-6">
        <input
          {...register(name, { required })}
          className={`border ${
            errors[name] ? "border-red-500" : "border-blue-500"
          } p-3 rounded-md placeholder:text-lg text-lg focus:outline-blue-500`}
          type={type}
          id={id}
          placeholder={placeholder}
        />

        {type === "password" &&
          (show ? (
            <VscEye
              onClick={() => setShow(!show)}
              size={22}
              className="text-gray-600 cursor-pointer absolute right-1"
            />
          ) : (
            <VscEyeClosed
              onClick={() => setShow(!show)}
              size={22}
              className="text-gray-600 cursor-pointer absolute right-1"
            />
          ))}
      </div>
      {/* Error Message */}
      {errors[name] && (
        <p className="text-[12px]text-red-500 text-sm">
          {errors[name] ? (errors[name]?.message as string) : ""}
        </p>
      )}
    </div>
  );
};

export default Input;
