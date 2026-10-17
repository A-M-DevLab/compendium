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
  
    product: ComicProduct;
  
    includedProducts: ComicProduct[];
  };

  export type ReadingPathType =
  | "character"
  | "genre"
  | "theme";

export type ReadingPath = {
  id: string;
  handle: string;
  title: string;

  description?: string;

  pathType: ReadingPathType;

  character?: Character;

  tiers: ReadingTier[];
};