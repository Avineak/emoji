"use client";
import { useCallback, useEffect, useState } from "react";
import {
  useSearchParams,
  usePathname,
} from "../../../node_modules/next/navigation";

import EmojiBox from "root/components/EmojiBox";
import Input from "root/components/Input";
import emojiData from "../emoji.json";
import { charMatch, pushBrowserHistory, shortNameToSlug } from "root/utils";
import { useDebounce } from "root/CustomHooks";
import { SEARCH_DELAY } from "root/consts";
import StatelessEmojiBox from "root/components/StatelessEmojiBox";

const DEFAULT_EMOJI_LIST = emojiData.slice(0, 50);

export default function Search() {
  const [search, setSearch] = useState("");
  const [listedEmoji, setListedEmoji] = useState<any[]>([]);

  const params = useSearchParams();
  const pathname = usePathname();

  const searchTerm = params?.get("q");

  const searchEmoji = useCallback(
    async (value: string) => {
      const searchWords = value.split(" ").filter((v) => v);

      const fuseResults = await Promise.all(
        searchWords.map((searchWord) => charMatch(searchWord, emojiData))
      );

      const fuseResult = fuseResults.flat();

      const filter = fuseResult.map((res) => res.item);

      if (value.includes("flag")) {
        setListedEmoji(filter);
        return;
      }
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
      pushBrowserHistory(pathname || "");
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
      <div className="flex flex-col m-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16">
        <div className="h-[44px]"> </div>
        <div className="text-center w-[100%]">
          <Input
            value={search}
            onChange={(e: any) => {
              updateSearch(e.target.value);
            }}
          />
          <div>
            {listedEmoji?.length ? (
              <div className="flex flex-row flex-wrap gap-[18px] md:mx-[70px] pt-[32px] justify-center">
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
            ) : (
              <h5 className="text-left pl-[80px]">Emoji not found...</h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
