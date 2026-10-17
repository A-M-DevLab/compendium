import { shopify } from "@/lib/shopify/client";

import {
  READING_PATHS_QUERY,
  READING_PATH_BY_HANDLE_QUERY,
} from "@/lib/shopify/queries/reading-paths";

import type { Character } from "@/types/character";
import type { ComicProduct } from "@/types/commerce";

import type {
  ReadingPath,
  ReadingPathType,
  ReadingTier,
  ReadingTierLevel,
} from "@/types/reading-path";

type ShopifyField = {
  value?: string | null;
} | null;

type ShopifyImageField = {
  reference?: {
    image?: {
      url: string;
      altText?: string | null;
    } | null;
  } | null;
} | null;

type ShopifyCharacter = {
  id: string;
  handle: string;

  name: ShopifyField;
  shortDescription: ShopifyField;
  description: ShopifyField;
  publisher: ShopifyField;

  heroImage: ShopifyImageField;

  featured: ShopifyField;
};

type ShopifyReference<T> = {
  reference?: T | null;
} | null;

type ShopifyReferences<T> = {
  references?: {
    nodes?: T[] | null;
  } | null;
} | null;

type ShopifyReadingTier = {
  id: string;
  handle: string;

  title: ShopifyField;
  tier: ShopifyField;
  description: ShopifyField;

  product: ShopifyReference<ComicProduct>;

  includedProducts: ShopifyReferences<ComicProduct>;
};

type ShopifyReadingPath = {
  id: string;
  handle: string;

  title: ShopifyField;
  description: ShopifyField;

  pathType: ShopifyField;

  character: ShopifyReference<ShopifyCharacter>;

  tiers: ShopifyReferences<ShopifyReadingTier>;
};

const tierOrder: Record<ReadingTierLevel, number> = {
  start_here: 0,
  go_deeper: 1,
  full_lore: 2,
};

function isReadingTierLevel(
  value: string | null | undefined
): value is ReadingTierLevel {
  return (
    value === "start_here" ||
    value === "go_deeper" ||
    value === "full_lore"
  );
}

function isReadingPathType(
  value: string | null | undefined
): value is ReadingPathType {
  return (
    value === "character" ||
    value === "genre" ||
    value === "theme"
  );
}

function mapCharacter(
  node?: ShopifyCharacter | null
): Character | undefined {
  if (!node) {
    return undefined;
  }

  const image = node.heroImage?.reference?.image;

  return {
    id: node.id,
    handle: node.handle,

    name: node.name?.value ?? "",

    shortDescription:
      node.shortDescription?.value ?? undefined,

    description:
      node.description?.value ?? undefined,

    publisher:
      node.publisher?.value ?? undefined,

    heroImage: image
      ? {
          url: image.url,
          altText: image.altText ?? null,
        }
      : null,

    featured:
      node.featured?.value === "true",
  };
}

function mapReadingTier(
  node: ShopifyReadingTier
): ReadingTier | null {
  const tier = node.tier?.value;

  if (!isReadingTierLevel(tier)) {
    console.warn(
      `Skipping reading tier "${node.handle}" because "${tier}" is not a valid tier`
    );

    return null;
  }

  const product = node.product?.reference;

  if (!product) {
    console.warn(
      `Skipping reading tier "${node.handle}" because it has no product`
    );

    return null;
  }

  return {
    id: node.id,
    handle: node.handle,

    title: node.title?.value ?? "",

    tier,

    description:
      node.description?.value ?? undefined,

    product,

    includedProducts:
      node.includedProducts?.references?.nodes ?? [],
  };
}

function mapReadingPath(
  node: ShopifyReadingPath
): ReadingPath | null {
  const pathType = node.pathType?.value;

  if (!isReadingPathType(pathType)) {
    console.warn(
      `Skipping reading path "${node.handle}" because "${pathType}" is not a valid path type`
    );

    return null;
  }

  const tiers = (
    node.tiers?.references?.nodes ?? []
  )
    .map(mapReadingTier)
    .filter(
      (tier): tier is ReadingTier =>
        tier !== null
    )
    .sort(
      (a, b) =>
        tierOrder[a.tier] -
        tierOrder[b.tier]
    );

  return {
    id: node.id,
    handle: node.handle,

    title: node.title?.value ?? "",

    description:
      node.description?.value ?? undefined,

    pathType,

    character:
      mapCharacter(node.character?.reference),

    tiers,
  };
}

export async function getReadingPaths(
  first = 20
): Promise<ReadingPath[]> {
  const { data, errors } =
    await shopify.request(
      READING_PATHS_QUERY,
      {
        variables: {
          first,
        },
      }
    );

  if (errors) {
    console.error(errors);

    throw new Error(
      "Failed to fetch reading paths from Shopify"
    );
  }

  const nodes =
    (data?.metaobjects?.nodes ??
      []) as ShopifyReadingPath[];

  return nodes
    .map(mapReadingPath)
    .filter(
      (path): path is ReadingPath =>
        path !== null
    );
}

export async function getReadingPathByHandle(
  handle: string
): Promise<ReadingPath | null> {
  const { data, errors } =
    await shopify.request(
      READING_PATH_BY_HANDLE_QUERY,
      {
        variables: {
          handle: {
            type: "reading_path",
            handle,
          },
        },
      }
    );

  if (errors) {
    console.error(errors);

    throw new Error(
      "Failed to fetch reading path from Shopify"
    );
  }

  const node =
    data?.metaobject as
      | ShopifyReadingPath
      | null;

  if (!node) {
    return null;
  }

  return mapReadingPath(node);
}