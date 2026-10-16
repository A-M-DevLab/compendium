export const COLLECTIONS_QUERY = `#graphql
  query Collections($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        title
        handle
        description

        image {
          url
          altText
        }
      }
    }
  }
`;