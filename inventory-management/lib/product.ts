import { apiFetch } from "./api";

export type Product = {
  _id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  stock: number;
  threshold: number;
  category: string;
  image: string;
  available: boolean;
};

export function getProduct(sku: string) {
  return apiFetch<{product:Product}>(`/products/get-product/${sku}`);
}
export function updateProduct(sku: string) {
  return apiFetch<{product:Product}>(`/products/update/${sku}`);
}