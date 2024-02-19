import Link from "next/link";

export default function Custom404() {
  return (
    <div className="">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-[48px] mb-[12px]">404  error!</h2>
        <Link href={"/"}>
          <button className="text-[32px] border-[#9A9191] border rounded-[10px] w-[250px]">
            🤷‍♂️ Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
