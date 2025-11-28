/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LuAsterisk } from "react-icons/lu";
import Select, { type SingleValue } from "react-select";

interface IProps {
  options: { label: string; value: string }[];
  id: string;
  label?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (x: any) => void;
  value: string
}

const SelectInput: React.FC<IProps> = ({
  options,
  id,
  label = "Select an Option",
  placeholder = "Select an Option",
  required = false,
  onChange,
  value,
  error
}) => {
  return (
    <div className="flex flex-col gap-3  h-29 p-0">
      <div className="flex">
        <label className="text-lg font-bold text-gray-800" htmlFor={id}>
          {label}
        </label>
        {required && <LuAsterisk size={12} className="text-red-500 mt-1" />}
      </div>
      <div>
        <Select
          id={id}
          options={options}
          defaultValue={options[0]}
          placeholder={placeholder}
          onChange={(option: SingleValue<{ label: string; value: string; }>) => {
            onChange(option?.value)
          }}
          value={options.filter(option => option.value === value)[0]}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              padding: '8px 0px',
              margin: '0px'
            }),
          }}
        />
      <p className=" text-[12px] text-red-500 h-[8px] mt-6">{error ? error : ' '}</p>
      </div>


    </div>
  );
};

export default SelectInput;
