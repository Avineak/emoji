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
      className="border border-solid border-gray-600 py-[6px] px-[18px] text-[16px] leading-7  rounded-[10px] text-black cursor-pointer "
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
      <header
        className="flex flex-row h-[60px] w-full sticky top-0 bg-indigo-800 items-center px-[48px] font-karla justify-between mb-[26px] text-20 text-white"
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <Link href="/" className="font-extrabold">
          emoji JOY
        </Link>
        <div className="font-extrabold">Click the emoji to copy!</div>
        <ol className="flex flex-row gap-[34px]">
          <li>
            <Link href="/blogs">Blog</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ol>
      </header>
      <main className="flex min-h-screen flex-col px-[196px]">
        <div className="text-center">
          <div className="text-[24px]  text-black leading-7 mb-[14px]">
            <strong>Search</strong>, <strong>copy</strong>, and{" "}
            <strong>paste</strong> emojis in <strong>your content!</strong>
          </div>
          <div className="text-black font-light text-[20px] leading-7 mb-[24px]">
            Copy and paste emojis in just a <strong>single mouse click</strong>!
            Add fun to your content for FREE!
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

          <div className="flex gap-[16px] justify-center">
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

          <div className="mb-[36px] mt-[44px] text-left text-black text-[24px]">
            😕 <strong>Not Sure?</strong> Copy from the quick list below!
          </div>

          <div>
            <div className="h-[50px] flex justify-between text-black bg-[#ACAAC4] items-center px-[128px] rounded-[10px]">
              <ul className="flex justify-between w-[100%]">
                {CHART_CATEGORIES.map((category) => (
                  <li
                    key={category}
                    className="cursor-pointer"
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

            <div className="flex flex-row flex-wrap gap-[18px] mx-[78px] pt-[32px]">
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
