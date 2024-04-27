"use client";
import { useEffect, useState } from "react";
import { useRouter } from "../../node_modules/next/navigation";

import StatelessEmojiBox from "root/components/StatelessEmojiBox";
import Input from "root/components/Input";
import emojiData from "./emoji.json";
import { CHART_CATEGORIES, SUGGESTED_CATEGORIES } from "../consts";
import { capitalizeFirstLetter, shortNameToSlug } from "root/utils";
import { HomePageSEOText } from "root/components/HomePageSEOText";

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
  const [selectedCategory, setSelectedCategory] = useState(CHART_CATEGORIES[0]);
  const [listedEmoji, setListedEmoji] = useState(
    emojiData.filter((d) => d.cg.includes(CHART_CATEGORIES[0])).slice(0, 50)
  );

  const router = useRouter();

  useEffect(() => {
    const filteredByCategory = emojiData.filter((d) =>
      d.cg.includes(selectedCategory)
    );

    const visibleEmoji =
      selectedCategory === "flags"
        ? filteredByCategory
        : filteredByCategory.slice(0, 50);

    setListedEmoji(visibleEmoji);
  }, [selectedCategory, setListedEmoji]);

  return (
    <>
      <div className="flex flex-col mx-2 sm:m-4 md:mx-8 lg:mx-12 xl:mx-16">
        <div className="text-center">
          <h2 className="text-[24px] text-black leading-7 mb-[16px]">
            Search emoji to copy in your email, newsletter, message or slack.
          </h2>

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

          <h2 className="mb-[12px] mt-[60px] text-left text-black text-[24px]">
            😕 <strong>Not Sure?</strong> Copy from the quick list below!
          </h2>

          <div>
            <div className="md:h-[50px] flex justify-between text-black md:bg-[#ACAAC4] items-center px-[0px] sm:px-[12px] lg:px-[108px]">
              <ul className="flex md:justify-between w-[100%] gap-[10px] flex-wrap md:gap-[0px] m-auto">
                {CHART_CATEGORIES.map((category) => (
                  <li
                    key={category}
                    className="cursor-pointer rounded-[10px] bg-[#D9D9D9] px-[12px] py-[8px] md:bg-transparent hover:scale-110"
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

            <div className="flex flex-row flex-wrap gap-[18px] mx-[16px] sm:mx-[32px] md:mx-[78px] pt-[32px] justify-center">
              {listedEmoji.map((emo, idx) => (
                <div key={idx} className="text-black">
                  <StatelessEmojiBox
                    route={`/${shortNameToSlug(emo.sn)}`}
                    emoji={emo.ch}
                    key={idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*  mx-2 sm:m-4 md:mx-8 lg:mx-12 xl:mx-16 */}
      <div className="border-[12px] border-solid border-[#382DBD] md:border-[24px] lg:border-[36px] xl:border-[48px]  border-b-0 border-t-[48px]  md:border-b-0 md:border-t-[48px]  lg:border-b-0 lg:border-t-[48px]  xl:border-b-0 xl:border-t-[48px]">
        <HomePageSEOText />
      </div>
    </>
  );
}
