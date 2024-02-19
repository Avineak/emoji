"use client";
import { toast } from "react-hot-toast";
import { ICONS } from "root/app/icons";

const CopyButton = ({ emoji }: { emoji: string }) => {
  return (
    <button
      className="w-[100%] h-[40px] flex justify-center bg-[#F4ECD1] items-center rounded-[10px] cursor-pointer shadow-md"
      onClick={() => {
        navigator.clipboard.writeText(emoji);
        toast.success(`Copied Emoji-"${emoji}"`);
      }}
    >
      {ICONS.copy} Copy
    </button>
  );
};

export default CopyButton;
