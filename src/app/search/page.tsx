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
