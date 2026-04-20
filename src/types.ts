export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
  }

  export type Cart = Record<number, number>;