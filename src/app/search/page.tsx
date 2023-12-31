"use client";
import { useEffect, useState } from "react";
import EmojiBox from "root/components/EmojiBox";
import Input from "root/components/Input";

import Link from "../../../node_modules/next/link";
import {
  useSearchParams,
  usePathname,
  useRouter,
} from "../../../node_modules/next/navigation";
import emojiData from "../emoji.json";

export default function Search() {
  const [search, setSearch] = useState("");
  const [listedEmoji, setListedEmoji] = useState(emojiData.slice(0, 50));

  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchTerm = params.get("q");

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
      searchEmoji(searchTerm);
    }
  }, [setSearch, searchTerm]);

  function updateSearch(value: string) {
    if (!value) {
      router.push("/");
      return;
    }

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("q", value);
    const newUrl = `${pathname}?${currentParams.toString()}`;
    history.pushState({ path: newUrl }, "", newUrl);
    const popstateEvent = new PopStateEvent("popstate");
    window.dispatchEvent(popstateEvent);
    setSearch(value);
    searchEmoji(value);
  }

  function searchEmoji(value: string) {
    const filter = emojiData.filter((emo) =>
      emo.kw.some((keyword) =>
        keyword.includes(value.replaceAll(" ", "_").trim())
      )
    );

    setListedEmoji(filter.slice(0, 50));
  }

  return (
    <>
      <header
        className="flex flex-row h-[60px] w-full sticky top-0 bg-indigo-800 text-black items-center px-[48px] font-karla justify-between mb-[26px] text-20 text-white"
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
          <Input
            value={search}
            onChange={(e: any) => {
              updateSearch(e.target.value);
            }}
          />
          <div>
            <div className="flex flex-row flex-wrap gap-[18px] mx-[70px] pt-[32px]">
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
