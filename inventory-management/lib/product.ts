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
export type CreateProductData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  threshold: number;
  image: File;
};

export async function createProduct(data: CreateProductData) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", String(data.price));
  formData.append("stock", String(data.stock));
  formData.append("category", data.category);
  formData.append("threshold", String(data.threshold));
  formData.append("image", data.image);

  return apiFetch("/products/create", {
    method: "POST",
    body: formData,
  });
}
export function getProduct(sku: string) {
  return apiFetch<{product:Product}>(`/products/get-product/${sku}`);
}
export function updateProduct(sku: string) {
  return apiFetch<{product:Product}>(`/products/update/${sku}`);
}