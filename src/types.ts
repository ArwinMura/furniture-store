export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
  }

  export type Cart = Record<number, number>;