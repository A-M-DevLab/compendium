export const CHARACTERS_QUERY = `#graphql
  query Characters($first: Int!) {
    metaobjects(type: "character", first: $first) {
      nodes {
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

        featured: field(key: "featured") {
          value
        }
      }
    }
  }
`;

export const CHARACTER_BY_HANDLE_QUERY = `#graphql
  query CharacterByHandle($handle: MetaobjectHandleInput!) {
    metaobject(handle: $handle) {
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

      featured: field(key: "featured") {
        value
      }
    }
  }
`;