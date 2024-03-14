export type TCategory =
  | "all"
  | "random picks"
  | "people"
  | "Animals"
  | "foods"
  | "Activities"
  | "travel"
  | "Flags";

export interface IEmoji {
  emoji: string;
  keywords: string[];
  category?: TCategory;
}

export interface IBlogsData {
  authors: string[];
  title: string;
  created_date: string;
  last_modified_date: string;
  description: string;
  slug: string;
  featured_image: string;
  duration: string;
  priority: string;
  content: string;
}
