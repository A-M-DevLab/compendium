import type {
    Money,
  } from "@/types/commerce";
  
  export type CartProduct = {
    id: string;
    title: string;
    handle: string;
  
    featuredImage?: {
      url: string;
      altText?: string | null;
    } | null;
  };
  
  export type CartMerchandise = {
    id: string;
    title: string;
    availableForSale: boolean;
  
    price: Money;
  
    product: CartProduct;
  };
  
  export type CartLine = {
    id: string;
    quantity: number;
  
    merchandise: CartMerchandise;
  };
  
  export type Cart = {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
  
    cost: {
      subtotalAmount: Money;
      totalAmount: Money;
    };
  
    lines: {
      nodes: CartLine[];
    };
  };