export type Character = {
    id: string;
    handle: string;
    name: string;
  
    shortDescription?: string;
    description?: string;
  
    publisher?: string;
  
    heroImage?: {
      url: string;
      altText?: string | null;
    } | null;
  
    featured?: boolean;
  };