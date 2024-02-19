"use client";
import { useRouter } from "next/navigation";

const StatelessEmojiBox = ({ emoji, route }: { emoji: string; route: string }) => {
  const router = useRouter();
  return (
    <div
      className="flex text-[74px] w-[95px] h-[104px] md:bg-[#E6E6E6] align-middle justify-center rounded-[10px] cursor-pointer md:hover:bg-[#D9D9D9]"
      onClick={() => {
        router.push(route);
      }}
    >
      {emoji}
    </div>
  );
};

export default StatelessEmojiBox;
