import { shopify } from "@/lib/shopify/client";
import { SHOP_QUERY } from "@/lib/shopify/queries/shop";

export async function GET() {
  const { data, errors } = await shopify.request(SHOP_QUERY);

  if (errors) {
    return Response.json(
      {
        status: "error",
        shopify: "disconnected",
        errors,
      },
      { status: 500 }
    );
  }

  return Response.json({
    status: "ok",
    shopify: "connected",
    store: data?.shop?.name,
  });
}