import type { Product } from "../types";

const BASE_URL = "http://localhost:8080/api";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export interface CreateOrderItemRequest {
    productId: number;
    quantity: number;
  }

  export interface CreateOrderRequest {
    customerName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    items: CreateOrderItemRequest[];
  }

  export interface OrderResponse {
    id: number;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    createdAt: string;
  }

  export async function createOrder(
    order: CreateOrderRequest
  ): Promise<OrderResponse> {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return response.json();
  }