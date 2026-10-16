import { searchProducts } from "@/lib/shopify/search";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return Response.json(
        {
          status: "error",
          message: "Missing search query",
        },
        { status: 400 }
      );
    }

    const products = await searchProducts(query, 20);

    return Response.json({
      status: "ok",
      query,
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