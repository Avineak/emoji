import Emoji from "../emoji.json";
import Input from "../../components/Input";
import { redirect } from "next/navigation";
import CopyButton from "root/components/CopyButton";
import StatelessEmojiBox from "root/components/StatelessEmojiBox";
import {
  getRandomItemsFromArray,
  nameFormatter,
  shortNameToSlug,
} from "root/utils";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const emojiData = Emoji.find(
    (emoji) => shortNameToSlug(emoji.sn) === params.slug
  );

  if (!emojiData) return null;

  const relatedEmoji = getRandomItemsFromArray(5, Emoji);

  return {
    name: emojiData.sn,
    description: emojiData.desc,
    symbol: emojiData.ch,
    keywords: emojiData.kw,
    relatedEmoji: relatedEmoji.map((emoji) => ({
      symbol: emoji.ch,
      slug: shortNameToSlug(emoji.sn),
    })),
  };
}

async function searchItem(formData: FormData) {
  "use server";

  const searchTerm = formData.get("searchTerm");
  redirect(`/search?q=${searchTerm}`);
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const emojiData = generateMetadata({ params });

  if (!emojiData) return <div>No Emoji found.</div>;

  return (
    <>
      <div
        className="flex flex-col m-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16"
        style={{ height: "calc(100vh - 170px)" }}
      >
        <form action={searchItem}>
          <Input type="text" name="searchTerm" />
        </form>

        <div className="flex flex-row md-w-[100%] sm-w-[90%] w-[90%] mx-auto gap-[60px] mt-[32px] mb-[32px]">
          <div className="w-[112px] items-center">
            <div className="text-[88px] text-center">{emojiData.symbol}</div>
            <CopyButton emoji={emojiData.symbol} />
          </div>
          <div className="p-[20px] box-border flex-1">
            <h2 className="text-[20px] font-extrabold">
              {nameFormatter(emojiData.name)}
            </h2>
            <h3 className="text-[18px] font-bold">Description</h3>
            <p className="text-[16px]">{emojiData.description}</p>
            <br />
            <h3 className="text-[18px] font-bold">Keywords</h3>
            <p className="text-[16px]">{emojiData.keywords.join(", ")}</p>
          </div>
        </div>

        <div className="md-w-[100%] sm-w-[90%] w-[90%] mx-auto gap-[60px] mt-[32px] mb-[32px]">
          <h1 className="text-[24px] font-bold md-w-[100%] sm-w-[90%] w-[90%]">
            Emoji you may like
          </h1>

          <div className="flex gap-[44px] mt-[16px]">
            {emojiData.relatedEmoji.map((data, idx) => (
              <StatelessEmojiBox
                route={`/${data.slug}`}
                emoji={data.symbol}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
