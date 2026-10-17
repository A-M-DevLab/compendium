import {
  createCart,
  getCart,
} from "@/lib/shopify/cart";

export async function POST() {
  try {
    const cart = await createCart();

    return Response.json({
      status: "ok",
      cart,
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

export async function GET(
  request: Request
) {
  try {
    const url = new URL(request.url);

    const id =
      url.searchParams.get("id");

    if (!id) {
      return Response.json(
        {
          status: "error",
          message: "Cart id is required",
        },
        { status: 400 }
      );
    }

    const cart = await getCart(id);

    if (!cart) {
      return Response.json(
        {
          status: "error",
          message: "Cart not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      status: "ok",
      cart,
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