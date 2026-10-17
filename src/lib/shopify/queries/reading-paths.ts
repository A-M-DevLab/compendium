const CHARACTER_FIELDS = `
  id
  handle

  name: field(key: "name") {
    value
  }

  shortDescription: field(key: "short_description") {
    value
  }

  description: field(key: "description") {
    value
  }

  publisher: field(key: "publisher") {
    value
  }

  heroImage: field(key: "hero_image") {
    reference {
      ... on MediaImage {
        image {
          url
          altText
        }
      }
    }
  }

  featured: field(key: "featured") {
    value
  }
`;

const PRODUCT_FIELDS = `
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
`;

const READING_TIER_FIELDS = `
  id
  handle

  title: field(key: "title") {
    value
  }

  tier: field(key: "tier") {
    value
  }

  description: field(key: "description") {
    value
  }

  product: field(key: "product") {
    reference {
      ... on Product {
        ${PRODUCT_FIELDS}
      }
    }
  }

  includedProducts: field(key: "included_products") {
    references(first: 10) {
      nodes {
        ... on Product {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

const READING_PATH_FIELDS = `
  id
  handle

  title: field(key: "title") {
    value
  }

  description: field(key: "description") {
    value
  }

  pathType: field(key: "path_type") {
    value
  }

  character: field(key: "character") {
    reference {
      ... on Metaobject {
        ${CHARACTER_FIELDS}
      }
    }
  }

  tiers: field(key: "tiers") {
    references(first: 10) {
      nodes {
        ... on Metaobject {
          ${READING_TIER_FIELDS}
        }
      }
    }
  }
`;

export const READING_PATHS_QUERY = `#graphql
  query ReadingPaths($first: Int!) {
    metaobjects(
      type: "reading_path"
      first: $first
    ) {
      nodes {
        ${READING_PATH_FIELDS}
      }
    }
  }
`;

export const READING_PATH_BY_HANDLE_QUERY = `#graphql
  query ReadingPathByHandle(
    $handle: MetaobjectHandleInput!
  ) {
    metaobject(handle: $handle) {
      ${READING_PATH_FIELDS}
    }
  }
`;