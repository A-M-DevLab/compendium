import { getCollections } from "@/lib/shopify/collections";

export async function GET() {
  try {
    const collections = await getCollections(20);

    return Response.json({
      status: "ok",
      count: collections.length,
      collections,
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