export type Money = {
    amount: string;
    currencyCode: string;
  };
  
  export type ProductVariant = {
    id: string;
    title: string;
    sku?: string | null;
    availableForSale: boolean;
    quantityAvailable?: number | null;
    price: Money;
  };
  
  export type ComicProduct = {
    id: string;
    title: string;
    handle: string;
    description: string;
    availableForSale: boolean;
  
    featuredImage?: {
      url: string;
      altText?: string | null;
    } | null;
  
    priceRange: {
      minVariantPrice: Money;
    };
  
    variants: {
      nodes: ProductVariant[];
    };
  };