export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  if (str.length === 1) return str.toUpperCase();

  return str[0].toUpperCase() + str.substring(1);
};

export const charMatch = async (pattern: string, emojiData: any[]) => {
  const Fuse = await import("fuse.js");
  const fuseOptions = {
    keys: ["cl", "kw", "sn"],
    threshold: 0.3,
    isCaseSensitive: false,
  };

  const fuse = new Fuse.default(emojiData, fuseOptions);

  return fuse.search(pattern);
};

export const pushBrowserHistory = (url: string) => {
  history.pushState({ path: url }, "", url);
  const popstateEvent = new PopStateEvent("popstate");
  window.dispatchEvent(popstateEvent);
};

export const shortNameToSlug = (name: string) => {
  const slug = name
    .toLowerCase()
    .split(" ")
    .filter((chunk) => !chunk.includes("&"))
    .join("-")
    .replaceAll("’", "-");

  return slug;
};

export const nameFormatter = (name: string) => {
  const nameChunks = name.split(" ");
  const nameChunksCapitalize = nameChunks.map(capitalizeFirstLetter);
  return nameChunksCapitalize.join(" ");
};

export const getRandomItemsFromArray = (num: number, arr: any[]) => {
  const numberOfItems = Math.min(num, 5);
  const shuffledArray = arr.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, numberOfItems);
};
