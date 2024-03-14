import Image from "next/image";
import { format } from "fecha";

import { getBlogBySlug } from "root/serverUtils";
import GoBackButton from "root/components/GoBackButton";
import { ICONS } from "root/app/icons";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blogData = await getBlogBySlug(params.slug);

  return {
    title: blogData.title.split("-").join(" "),
    description: blogData.description,
  };
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const blogData = await getBlogBySlug(params.slug);

  return (
    <div className="m-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-[192px]">
      <div className="flex">
        <div className="flex-1">
          <GoBackButton className="text-[#ACADAF] flex mb-[12px]">
            {ICONS.back} Back
          </GoBackButton>
          <h1 className="flex text-[32px] font-bold w-[100%]">
            {blogData.title}
          </h1>

          <div>{blogData.authors}</div>
          <div>
            {format(new Date(blogData.created_date), "MMM DD, YYYY")} |{" "}
            {blogData.duration} min read
          </div>
        </div>
        <Image
          src={blogData.featured_image}
          alt={blogData.slug}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "406px", height: "auto" }}
        />
      </div>
      <br />
      <div
        dangerouslySetInnerHTML={{ __html: blogData.content }}
        className="blog-content"
      ></div>

      <p className="mt-[32px]">
        Search emoji from{" "}
        <a href="/" className="text-blue-500 underline">
          Emojijoy
        </a>
      </p>
    </div>
  );
}
