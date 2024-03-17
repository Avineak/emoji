import { MetadataRoute } from "next";
import { getBlogSlugs } from "root/serverUtils";
import { shortNameToSlug } from "root/utils";

const ENV = process.env.NODE_ENV;

const SITE_URL =
  ENV === "development" ? "http://localhost:3000" : "https://emojijoy.com";

async function generateEmojiPagesMap() {
  const emojiImport = await import("./emoji.json");
  const emojiData = emojiImport.default;
  const lastModifiedDate = new Date().toISOString().substring(0, 8) + "01";
  const formattedDate = new Date(lastModifiedDate);

  const xmlEntries = emojiData.map((data) => {
    return {
      url: `${SITE_URL}/${shortNameToSlug(data.sn)}`,
      lastModified: formattedDate,
      changeFrequency: "monthly",
      priority: 1,
    };
  }) as MetadataRoute.Sitemap;

  return xmlEntries;
}

async function generateBlogPagesMap() {
  const blogSlugs = await getBlogSlugs();
  const lastModifiedDate = new Date().toISOString().substring(0, 8) + "01";
  const formattedDate = new Date(lastModifiedDate);

  const xmlEntries = blogSlugs.map((slug) => {
    return {
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: formattedDate,
      changeFrequency: "monthly",
      priority: 1,
    };
  }) as MetadataRoute.Sitemap;

  return xmlEntries;
}

function generatePagesRoutes() {
  const lastModifiedDate = new Date().toISOString().substring(0, 8) + "01";
  const formattedDate = new Date(lastModifiedDate);

  const xmlEntries = ["", "search", "404", "blog"].map((route) => ({
    url: `${SITE_URL}/${route}`,
    lastModified: formattedDate,
    changeFrequency: "yearly",
    priority: 1,
  })) as MetadataRoute.Sitemap;

  return xmlEntries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const emojiPagesRoutes = await generateEmojiPagesMap();
  const blogPagesRoutes = await generateBlogPagesMap();
  const defaultPagesRoutes = generatePagesRoutes();

  return [...defaultPagesRoutes, ...emojiPagesRoutes, ...blogPagesRoutes];
}
