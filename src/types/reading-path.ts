import type { ComicProduct } from "@/types/commerce";
import type { Character } from "@/types/character";

export type ReadingTierLevel =
  | "start_here"
  | "go_deeper"
  | "full_lore";

export type ReadingTier = {
  id: string;
  handle: string;
  title: string;
  tier: ReadingTierLevel;

  description?: string;

  character?: Character;

  books: ComicProduct[];
};

export type ReadingPath = {
  id: string;
  handle: string;
  title: string;

  character?: Character;

  description?: string;

  tiers: ReadingTier[];
};