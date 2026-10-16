export const PRODUCT_BY_HANDLE_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
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
`;