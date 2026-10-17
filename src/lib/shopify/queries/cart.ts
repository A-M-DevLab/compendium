export const CART_FRAGMENT = `#graphql
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity

    cost {
      subtotalAmount {
        amount
        currencyCode
      }

      totalAmount {
        amount
        currencyCode
      }
    }

    lines(first: 50) {
      nodes {
        id
        quantity

        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale

            price {
              amount
              currencyCode
            }

            product {
              id
              title
              handle

              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `#graphql
  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }

      userErrors {
        field
        message
      }
    }
  }

  ${CART_FRAGMENT}
`;

export const CART_QUERY = `#graphql
  query Cart($id: ID!) {
    cart(id: $id) {
      ...CartFields
    }
  }

  ${CART_FRAGMENT}
`;

export const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
  ) {
    cartLinesAdd(
      cartId: $cartId
      lines: $lines
    ) {
      cart {
        ...CartFields
      }

      userErrors {
        field
        message
      }
    }
  }

  ${CART_FRAGMENT}
`;

export const CART_LINES_UPDATE_MUTATION = `#graphql
  mutation CartLinesUpdate(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
  ) {
    cartLinesUpdate(
      cartId: $cartId
      lines: $lines
    ) {
      cart {
        ...CartFields
      }

      userErrors {
        field
        message
      }
    }
  }

  ${CART_FRAGMENT}
`;

export const CART_LINES_REMOVE_MUTATION = `#graphql
  mutation CartLinesRemove(
    $cartId: ID!
    $lineIds: [ID!]!
  ) {
    cartLinesRemove(
      cartId: $cartId
      lineIds: $lineIds
    ) {
      cart {
        ...CartFields
      }

      userErrors {
        field
        message
      }
    }
  }

  ${CART_FRAGMENT}
`;