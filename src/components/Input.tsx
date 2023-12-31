import { ICONS } from "../app/icons";

const Input = ({
  onChange,
  value,
}: {
  value: string;
  onChange: (e: any) => void;
}) => {
  return (
    <div className="flex border-solid border-2 border-[#706F7F] rounded-[15px] mb-[24px] h-[50px] items-center pl-[10px] overflow-hidden">
      {ICONS.search}
      <input
        className="text-20 p-[5px] pr-[20px] text-black outline-none border-none flex-1"
        placeholder="Search Emojis"
        value={value}
        onChange={onChange}
        autoFocus
      />
    </div>
  );
};

export default Input;
