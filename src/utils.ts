// import * as Fuse from "fuse.js";

// const fuse = await import("fuse.js");

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  if (str.length === 1) return str.toUpperCase();

  return str[0].toUpperCase() + str.substring(1);
};

export const charMatch = async (pattern: string, emojiData: any[]) => {
  const Fuse = await import("fuse.js")
  const fuseOptions = {
    keys: ["cl", "kw"],
    threshold: 0.4
  };

  const fuse = new Fuse.default(emojiData, fuseOptions);

  return fuse.search(pattern);
};
