import {
    addCartLines,
    removeCartLine,
    updateCartLine,
  } from "@/lib/shopify/cart";
  
  type AddLineBody = {
    cartId?: string;
    merchandiseId?: string;
    quantity?: number;
  };
  
  type UpdateLineBody = {
    cartId?: string;
    lineId?: string;
    quantity?: number;
  };
  
  type RemoveLineBody = {
    cartId?: string;
    lineId?: string;
  };
  
  export async function POST(
    request: Request
  ) {
    try {
      const body =
        (await request.json()) as AddLineBody;
  
      if (!body.cartId) {
        return Response.json(
          {
            status: "error",
            message: "cartId is required",
          },
          { status: 400 }
        );
      }
  
      if (!body.merchandiseId) {
        return Response.json(
          {
            status: "error",
            message:
              "merchandiseId is required",
          },
          { status: 400 }
        );
      }
  
      const quantity =
        body.quantity ?? 1;
  
      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return Response.json(
          {
            status: "error",
            message:
              "quantity must be a positive integer",
          },
          { status: 400 }
        );
      }
  
      const cart =
        await addCartLines(
          body.cartId,
          body.merchandiseId,
          quantity
        );
  
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
  
  export async function PATCH(
    request: Request
  ) {
    try {
      const body =
        (await request.json()) as UpdateLineBody;
  
      if (!body.cartId) {
        return Response.json(
          {
            status: "error",
            message: "cartId is required",
          },
          { status: 400 }
        );
      }
  
      if (!body.lineId) {
        return Response.json(
          {
            status: "error",
            message: "lineId is required",
          },
          { status: 400 }
        );
      }
  
      if (
        !Number.isInteger(body.quantity) ||
        body.quantity! < 1
      ) {
        return Response.json(
          {
            status: "error",
            message:
              "quantity must be a positive integer",
          },
          { status: 400 }
        );
      }
  
      const cart =
        await updateCartLine(
          body.cartId,
          body.lineId,
          body.quantity!
        );
  
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
  
  export async function DELETE(
    request: Request
  ) {
    try {
      const body =
        (await request.json()) as RemoveLineBody;
  
      if (!body.cartId) {
        return Response.json(
          {
            status: "error",
            message: "cartId is required",
          },
          { status: 400 }
        );
      }
  
      if (!body.lineId) {
        return Response.json(
          {
            status: "error",
            message: "lineId is required",
          },
          { status: 400 }
        );
      }
  
      const cart =
        await removeCartLine(
          body.cartId,
          body.lineId
        );
  
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