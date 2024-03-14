import Link from "next/link";
import Image from "next/image";

import { format } from "fecha";

import { getAllBlogs } from "root/serverUtils";
import { IBlogsData } from "root/interface";

function Separator() {
  return <div className="mx-[8px] -translate-y-1/4">.</div>;
}

function BlogCard({ blogData }: { blogData: IBlogsData }) {
  const {
    authors,
    title,
    description,
    created_date,
    duration,
    slug,
    featured_image,
  } = blogData;

  return (
    <div className="flex gap-[20px] cursor-pointer">
      <div>
        <h3 className="font-bold text-[16px]">{authors[0]} from emojiJOY</h3>
        <Link href={`/blog/${slug}`} passHref>
          <h2 className="font-bold text-[20px]">{title}</h2>
        </Link>
        <p className="mt-[10px] mb-[10px] w-[450px] line-clamp-2">
          {description}
        </p>
        <div className="flex text-[12px]">
          <div>{format(new Date(created_date), "MMM DD YYYY")}</div>
          <Separator />
          <div>{duration} mins read</div>
        </div>
      </div>
      <Image
        src={featured_image}
        alt={title}
        width={244}
        height={132}
        style={{ objectFit: "contain", width: "244px", height: "132px" }}
        className="mb-[12px]"
      />
    </div>
  );
}

export default async function Blogs() {
  const blogs = await getAllBlogs();

  return (
    <div className="mt-[20px] m-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16">
      <h4 className="mb-[20px] font-bold text-[18px]">
        Learn more about emojis.
      </h4>
      {blogs.map((blogData: IBlogsData, index: number) => (
        <BlogCard blogData={blogData} key={index} />
      ))}
    </div>
  );
}
