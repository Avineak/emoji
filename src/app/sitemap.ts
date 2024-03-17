import { MetadataRoute } from "next";
import { shortNameToSlug } from "root/utils";

async function generateEmojiPagesMap() {
  const emojiImport = await import("./emoji.json");
  const emojiData = emojiImport.default;
  const lastModifiedDate = new Date().toISOString().substring(0, 8) + "01";
  const formattedDate = new Date(lastModifiedDate);

  const xmlEntries = emojiData.map((data) => {
    return {
      url: `https://emojijoy.com/${shortNameToSlug(data.sn)}`,
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

  const xmlEntries = ["/", "/search", "/404"].map((route) => ({
    url: `https://emojijoy.com${route}`,
    lastModified: formattedDate,
    changeFrequency: "yearly",
    priority: 1,
  })) as MetadataRoute.Sitemap;

  return xmlEntries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const emojiPagesRoutes = await generateEmojiPagesMap();
  const defaultPagesRoutes = generatePagesRoutes();

  return [...emojiPagesRoutes, ...defaultPagesRoutes];
}
