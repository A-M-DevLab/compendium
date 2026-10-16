import { getProductByHandle } from "@/lib/shopify/products";

type Params = {
  params: Promise<{
    handle: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: Params
) {
  try {
    const { handle } = await params;

    const product = await getProductByHandle(handle);

    if (!product) {
      return Response.json(
        {
          status: "error",
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      status: "ok",
      product,
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