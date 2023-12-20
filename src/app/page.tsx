import Link from "../../node_modules/next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header
        className="flex flex-row h-[87px] w-full sticky top-0 bg-amber-100 text-black items-center px-[48px] font-karla justify-between mb-[60px] text-20"
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <Link href="/">Emojis</Link>
        <ol className="flex flex-row gap-[34px]">
          <li>
            <Link href="/blogs">Blog</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ol>
      </header>

      <div className="px-[48px]">
        <div className="text-[40px] leading-112 text-black">
          <strong>Search</strong>, <strong>copy</strong>, and{" "}
          <strong>paste</strong> emojis wherever you like
        </div>
        <div className="text-black font-light text-20">
          Copy and paste 400+ emojis in just a single mouse click! Add fun to
          your communication for FREE!
        </div>
        <input
          className="w-[88%] text-20  border-solid border-2 border-gray-300 p-[5px] rounded-[10px] pr-[20px] text-black"
          placeholder="Search Emojis"
        />

        <div className="h-[250px]"></div>

        <div>
          <div className="h-[71px] flex justify-between text-black bg-gray-200 items-center px-[48px]">
            <ul className="flex flex-row gap-[44px]">
              <li>All</li>
              <li>Random Pick</li>
              <li>People</li>
              <li>Animals</li>
              <li>Foods</li>
              <li>Activities</li>
              <li>Travel</li>
              <li>Flags</li>
            </ul>
            <div>Face Emoji</div>
          </div>
          <div>
            <img />
          </div>
        </div>
      </div>
    </main>
  );
}
