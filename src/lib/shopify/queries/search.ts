export const SEARCH_PRODUCTS_QUERY = `#graphql
  query SearchProducts(
    $query: String!
    $first: Int!
  ) {
    search(
      query: $query
      first: $first
      types: PRODUCT
    ) {
      nodes {
        ... on Product {
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
  }
`;