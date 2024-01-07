"use client";
import { useEffect, useState } from "react";
import EmojiBox from "root/components/EmojiBox";
import Input from "root/components/Input";

import emojiData from "./emoji.json";
import Link from "../../node_modules/next/link";
import { useRouter } from "../../node_modules/next/navigation";
import { CHART_CATEGORIES, SUGGESTED_CATEGORIES } from "../consts";
import { capitalizeFirstLetter } from "root/utils";

const SuggestedCategory = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <span
      className="border border-solid border-gray-600 py-[2px] sm:p-[6px] px-[18px] text-[16px] leading-7  rounded-[10px] text-black cursor-pointer "
      style={{ boxShadow: "0px 4px 4px 0px rgba(56, 45, 189, 0.25)" }}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [listedEmoji, setListedEmoji] = useState(emojiData.slice(0, 50));
  const [selectedCategory, setSelectedCategory] = useState(CHART_CATEGORIES[0]);

  const router = useRouter();

  useEffect(() => {
    const filteredByCategory = emojiData.filter((d) =>
      d.cg.includes(selectedCategory)
    );

    const visibleEmoji =
      selectedCategory === "flags"
        ? filteredByCategory
        : filteredByCategory.slice(0, 100);

    setListedEmoji(visibleEmoji);
  }, [selectedCategory, setListedEmoji]);

  return (
    <>
      <main className="flex min-h-screen flex-col mx-2 sm:m-4 md:mx-8 lg:mx-12 xl:mx-16">
        <div className="text-center">
          <div className="text-[24px] text-black leading-7 mb-[16px]">
            Easily <strong>jazz up your content</strong> with emojis – discover,
            copy, and paste in a single click <strong>for free!</strong>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search?q=${search}`);
            }}
          >
            <Input
              value={search}
              onChange={(e: any) => {
                const searchTerm = e.target.value;
                setSearch(searchTerm);
              }}
            />
          </form>

          <div className="flex gap-[16px] justify-center flex-row flex-wrap w-[100%]">
            {SUGGESTED_CATEGORIES.map((category) => (
              <SuggestedCategory
                label={category}
                key={category}
                onClick={() => {
                  router.push(`/search?q=${category}`);
                }}
              />
            ))}
          </div>

          <div className="mb-[12px] mt-[60px] text-left text-black text-[24px]">
            😕 <strong>Not Sure?</strong> Copy from the quick list below!
          </div>

          <div>
            <div className="h-[50px] flex justify-between text-black md:bg-[#ACAAC4] items-center px-[0px] sm:px-[12px] lg:px-[64px]">
              <ul className="flex md:justify-between w-[100%] gap-[10px] flex-wrap md:gap-[0px] m-auto">
                {CHART_CATEGORIES.map((category) => (
                  <li
                    key={category}
                    className="cursor-pointer rounded-[10px] bg-[#D9D9D9] px-[12px] py-[8px] md:bg-transparent"
                    onClick={() => {
                      setSelectedCategory(category.toLocaleLowerCase());
                    }}
                  >
                    {selectedCategory === category ? (
                      <strong>{capitalizeFirstLetter(category)}</strong>
                    ) : (
                      capitalizeFirstLetter(category)
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-row flex-wrap gap-[18px] mx-[16px] sm:mx-[32px] md:mx-[78px] pt-[32px]">
              {listedEmoji.map((emo, idx) => (
                <div key={idx} className="text-black">
                  <EmojiBox emoji={emo.ch} description={emo.sn} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
