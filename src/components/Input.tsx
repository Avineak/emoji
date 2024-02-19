"use client";
import { ICONS } from "../app/icons";

const Input = ({
  onChange,
  value,
  ...rest
}: {
  value?: string;
  onChange?: (e: any) => void;
  type?: string;
  name?: string;
}) => {
  return (
    <div className="flex border-solid border-2 border-[#706F7F] rounded-[15px] mb-[12px] h-[50px] items-center pl-[10px] overflow-hidden md-w-[100%] sm-w-[90%] w-[90%] m-auto">
      {ICONS.search}
      <input
        className="text-20 p-[5px] pr-[20px] text-black outline-none border-none flex-1"
        placeholder="Search Emojis"
        value={value}
        onChange={onChange}
        autoFocus
        {...rest}
      />
    </div>
  );
};

export default Input;
