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
  category?: TCategory
}
