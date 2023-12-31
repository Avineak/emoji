import { toast } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { capitalizeFirstLetter } from "root/utils";

const EmojiBox = ({
  emoji,
  description,
}: {
  emoji: string;
  description: string;
}) => {
  return (
    <>
      <div
        data-tooltip-id={`tooltip-emoji-${emoji}`}
        data-tooltip-content={capitalizeFirstLetter(description)}
        className="flex text-[74px] w-[95px] h-[104px] bg-[#E6E6E6] align-middle justify-center rounded-[10px] cursor-pointer hover:bg-[#D9D9D9]"
        onClick={() => {
          navigator.clipboard.writeText(emoji);
          toast.success(`Copied Emoji-"${emoji}"`);
        }}
      >
        {emoji}
      </div>
      <Tooltip id={`tooltip-emoji-${emoji}`} />
    </>
  );
};

export default EmojiBox;
