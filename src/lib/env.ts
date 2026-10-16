import { z } from "zod";

const envSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.string().min(1),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1),
  SHOPIFY_API_VERSION: z.string().default("2026-10"),
});

export const env = envSchema.parse({
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN:
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,
});