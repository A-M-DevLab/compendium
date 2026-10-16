import { shopify } from "@/lib/shopify/client";
import { PRODUCTS_QUERY } from "@/lib/shopify/queries/products";
import type { ComicProduct } from "@/types/commerce";

type GetProductsOptions = {
  first?: number;
};

export async function getProducts({
  first = 20,
}: GetProductsOptions = {}): Promise<ComicProduct[]> {
  const { data, errors } = await shopify.request(PRODUCTS_QUERY, {
    variables: {
      first,
    },
  });

  if (errors) {
    console.error(errors);
    throw new Error("Failed to fetch products from Shopify");
  }

  return (data?.products?.nodes ?? []) as ComicProduct[];
}

import { PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify/queries/product";

export async function getProductByHandle(
    handle: string
  ): Promise<ComicProduct | null> {
    const { data, errors } = await shopify.request(
      PRODUCT_BY_HANDLE_QUERY,
      {
        variables: {
          handle,
        },
      }
    );
  
    if (errors) {
      console.error(errors);
      throw new Error("Failed to fetch product from Shopify");
    }
  
    return (data?.product ?? null) as ComicProduct | null;
  }