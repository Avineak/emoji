"use client";
import { useCallback, useEffect, useState } from "react";
import {
  useSearchParams,
  usePathname,
  useRouter,
} from "../../../node_modules/next/navigation";

import EmojiBox from "root/components/EmojiBox";
import Input from "root/components/Input";
import emojiData from "../emoji.json";
import { charMatch, pushBrowserHistory } from "root/utils";
import { useDebounce } from "root/CustomHooks";
import { SEARCH_DELAY } from "root/consts";

const DEFAULT_EMOJI_LIST = emojiData.slice(0, 50);

export default function Search() {
  const [search, setSearch] = useState("");
  const [listedEmoji, setListedEmoji] = useState(DEFAULT_EMOJI_LIST);

  const params = useSearchParams();
  const pathname = usePathname();

  const searchTerm = params.get("q");

  const searchEmoji = useCallback(
    async (value: string) => {
      const fuseResults = await charMatch(value, emojiData);

      const filter = fuseResults.map((res) => res.item);

      setListedEmoji(filter.slice(0, 50));
    },
    [setListedEmoji]
  );

  const debouncedSearch = useDebounce(searchEmoji, SEARCH_DELAY);

  useEffect(
    () => {
      if (searchTerm) {
        setSearch(searchTerm);
        searchEmoji(searchTerm);
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function updateSearch(value: string) {
    if (!value) {
      setSearch("");
      setListedEmoji(DEFAULT_EMOJI_LIST);
      pushBrowserHistory(pathname);
      return;
    }

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("q", value);
    const newUrl = `${pathname}?${currentParams.toString()}`;
    pushBrowserHistory(newUrl);
    setSearch(value);
    debouncedSearch(value);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col  m-2 sm:m-4 md:p-8 lg:m-12 xl:m-16">
        <div className="text-center w-[100%]">
          <Input
            value={search}
            onChange={(e: any) => {
              updateSearch(e.target.value);
            }}
          />
          <div>
            <div className="flex flex-row flex-wrap gap-[18px] md:mx-[70px] pt-[32px] justify-center">
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
