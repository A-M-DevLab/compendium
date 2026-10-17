import { shopify } from "@/lib/shopify/client";
import {
  CHARACTERS_QUERY,
  CHARACTER_BY_HANDLE_QUERY,
} from "@/lib/shopify/queries/metaobjects";
import type { Character } from "@/types/character";

type ShopifyMetaobjectField = {
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

type ShopifyCharacterMetaobject = {
  id: string;
  handle: string;

  name: ShopifyMetaobjectField;
  shortDescription: ShopifyMetaobjectField;
  description: ShopifyMetaobjectField;
  publisher: ShopifyMetaobjectField;
  heroImage: ShopifyImageField;
  featured: ShopifyMetaobjectField;
};

export async function getCharacters(
  first = 20
): Promise<Character[]> {
  const { data, errors } = await shopify.request(
    CHARACTERS_QUERY,
    {
      variables: {
        first,
      },
    }
  );

  if (errors) {
    console.error(errors);
    throw new Error("Failed to fetch characters from Shopify");
  }

  const nodes =
    (data?.metaobjects?.nodes ?? []) as ShopifyCharacterMetaobject[];

  return nodes.map((node) => ({
    id: node.id,
    handle: node.handle,
    name: node.name?.value ?? "",
    shortDescription:
      node.shortDescription?.value ?? undefined,
    description:
      node.description?.value ?? undefined,
    publisher:
      node.publisher?.value ?? undefined,
      heroImage: node.heroImage?.reference?.image
      ? {
          url: node.heroImage.reference.image.url,
          altText:
            node.heroImage.reference.image.altText ?? null,
        }
      : null,
    featured:
      node.featured?.value === "true",
  }));
}

export async function getCharacterByHandle(
  handle: string
): Promise<Character | null> {
  const { data, errors } = await shopify.request(
    CHARACTER_BY_HANDLE_QUERY,
    {
      variables: {
        handle: {
          type: "character",
          handle,
        },
      },
    }
  );

  if (errors) {
    console.error(errors);
    throw new Error("Failed to fetch character from Shopify");
  }

  const node =
    data?.metaobject as ShopifyCharacterMetaobject | null;

  if (!node) {
    return null;
  }

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
    heroImage: node.heroImage?.reference?.image
      ? {
          url: node.heroImage.reference.image.url,
          altText:
            node.heroImage.reference.image.altText ?? null,
        }
      : null,
    featured:
      node.featured?.value === "true",
  };
}