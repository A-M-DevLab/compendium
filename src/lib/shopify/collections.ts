import { shopify } from "@/lib/shopify/client";
import { COLLECTIONS_QUERY } from "@/lib/shopify/queries/collections";

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText?: string | null;
  } | null;
};

export async function getCollections(
  first = 20
): Promise<ShopifyCollection[]> {
  const { data, errors } = await shopify.request(
    COLLECTIONS_QUERY,
    {
      variables: {
        first,
      },
    }
  );

  if (errors) {
    console.error(errors);
    throw new Error("Failed to fetch collections from Shopify");
  }

  return (data?.collections?.nodes ?? []) as ShopifyCollection[];
}