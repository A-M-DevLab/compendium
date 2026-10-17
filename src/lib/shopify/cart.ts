import { shopify } from "@/lib/shopify/client";

import {
    CART_CREATE_MUTATION,
    CART_LINES_ADD_MUTATION,
    CART_LINES_REMOVE_MUTATION,
    CART_LINES_UPDATE_MUTATION,
    CART_QUERY,
  } from "@/lib/shopify/queries/cart";

import type { Cart } from "@/types/cart";

type ShopifyUserError = {
  field?: string[] | null;
  message: string;
};

function throwUserErrors(
  errors:
    | ShopifyUserError[]
    | null
    | undefined
) {
  if (!errors?.length) {
    return;
  }

  throw new Error(
    errors
      .map((error) => error.message)
      .join(", ")
  );
}

export async function createCart(): Promise<Cart> {
  const { data, errors } =
    await shopify.request(
      CART_CREATE_MUTATION,
      {
        variables: {
          input: {},
        },
      }
    );

  if (errors) {
    console.error(errors);

    throw new Error(
      "Failed to create Shopify cart"
    );
  }

  throwUserErrors(
    data?.cartCreate?.userErrors
  );

  const cart =
    data?.cartCreate?.cart as
      | Cart
      | null
      | undefined;

  if (!cart) {
    throw new Error(
      "Shopify did not return a cart"
    );
  }

  return cart;
}

export async function getCart(
  id: string
): Promise<Cart | null> {
  const { data, errors } =
    await shopify.request(
      CART_QUERY,
      {
        variables: {
          id,
        },
      }
    );

  if (errors) {
    console.error(errors);

    throw new Error(
      "Failed to fetch Shopify cart"
    );
  }

  return (
    (data?.cart as Cart | null) ??
    null
  );
}

export async function addCartLines(
  cartId: string,
  merchandiseId: string,
  quantity = 1
): Promise<Cart> {
  const { data, errors } =
    await shopify.request(
      CART_LINES_ADD_MUTATION,
      {
        variables: {
          cartId,
          lines: [
            {
              merchandiseId,
              quantity,
            },
          ],
        },
      }
    );

  if (errors) {
    console.error(errors);

    throw new Error(
      "Failed to add item to Shopify cart"
    );
  }

  throwUserErrors(
    data?.cartLinesAdd?.userErrors
  );

  const cart =
    data?.cartLinesAdd?.cart as
      | Cart
      | null
      | undefined;

  if (!cart) {
    throw new Error(
      "Shopify did not return the updated cart"
    );
  }

  return cart;
}

export async function updateCartLine(
    cartId: string,
    lineId: string,
    quantity: number
  ): Promise<Cart> {
    const { data, errors } =
      await shopify.request(
        CART_LINES_UPDATE_MUTATION,
        {
          variables: {
            cartId,
            lines: [
              {
                id: lineId,
                quantity,
              },
            ],
          },
        }
      );
  
    if (errors) {
      console.error(errors);
  
      throw new Error(
        "Failed to update Shopify cart line"
      );
    }
  
    throwUserErrors(
      data?.cartLinesUpdate?.userErrors
    );
  
    const cart =
      data?.cartLinesUpdate?.cart as
        | Cart
        | null
        | undefined;
  
    if (!cart) {
      throw new Error(
        "Shopify did not return the updated cart"
      );
    }
  
    return cart;
  }
  
  export async function removeCartLine(
    cartId: string,
    lineId: string
  ): Promise<Cart> {
    const { data, errors } =
      await shopify.request(
        CART_LINES_REMOVE_MUTATION,
        {
          variables: {
            cartId,
            lineIds: [lineId],
          },
        }
      );
  
    if (errors) {
      console.error(errors);
  
      throw new Error(
        "Failed to remove Shopify cart line"
      );
    }
  
    throwUserErrors(
      data?.cartLinesRemove?.userErrors
    );
  
    const cart =
      data?.cartLinesRemove?.cart as
        | Cart
        | null
        | undefined;
  
    if (!cart) {
      throw new Error(
        "Shopify did not return the updated cart"
      );
    }
  
    return cart;
  }