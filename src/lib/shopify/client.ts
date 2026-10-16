import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { env } from "@/lib/env";

export const shopify = createStorefrontApiClient({
  storeDomain: env.SHOPIFY_STORE_DOMAIN,
  apiVersion: env.SHOPIFY_API_VERSION,
  publicAccessToken: env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});