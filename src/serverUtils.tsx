import fs from "fs";
import path from "path";
import matter from "gray-matter";
// @ts-ignore
import { remark } from "remark";
// @ts-ignore
import html from "remark-html";

import { IBlogsData } from "./interface";

const BLOGS_PATH = path.join(path.resolve(), "src", "blogs");

export const getBlogBySlug = async (slug: string) => {
  const fileName = slug + ".mdx";

  const blogMarkdown = fs.readFileSync(
    path.join(BLOGS_PATH, fileName),
    "utf-8"
  );

  const matterResult = matter(blogMarkdown);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    ...matterResult.data,
    content: contentHtml,
    slug,
  } as IBlogsData;
};

export const getAllBlogs = async (): Promise<IBlogsData[]> => {
  const files = fs.readdirSync(BLOGS_PATH);

  const blogs = await Promise.all(
    files.map((filename): Promise<IBlogsData> => {
      const slug = filename.replace(".mdx", "");

      return getBlogBySlug(slug);
    })
  );

  return blogs;
};
