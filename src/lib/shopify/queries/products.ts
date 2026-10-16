export const PRODUCTS_QUERY = `#graphql
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        availableForSale

        featuredImage {
          url
          altText
        }

        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }

        variants(first: 20) {
          nodes {
            id
            title
            sku
            availableForSale
            quantityAvailable

            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;