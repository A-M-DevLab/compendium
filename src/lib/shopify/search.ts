import { shopify } from "@/lib/shopify/client";
import { SEARCH_PRODUCTS_QUERY } from "@/lib/shopify/queries/search";
import type { ComicProduct } from "@/types/commerce";

export async function searchProducts(
  query: string,
  first = 20
): Promise<ComicProduct[]> {
  const { data, errors } = await shopify.request(
    SEARCH_PRODUCTS_QUERY,
    {
      variables: {
        query,
        first,
      },
    }
  );

  if (errors) {
    console.error(errors);
    throw new Error("Failed to search Shopify products");
  }

  return (data?.search?.nodes ?? []) as ComicProduct[];
}