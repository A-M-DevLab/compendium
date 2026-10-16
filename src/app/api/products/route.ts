import { getProducts } from "@/lib/shopify/products";

export async function GET() {
  try {
    const products = await getProducts({ first: 10 });

    return Response.json({
      status: "ok",
      count: products.length,
      products,
    });
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}