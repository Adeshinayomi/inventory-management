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

export type InventoryStats ={
  outOfStock:number,
  totalUnit:number, 
  lowStocks:number,
  inventoryValue:number
}
export function getCategories() {
  return apiFetch<{categories:string[]}>("/products/categories");
}
export function getInventoryProducts() {
  return apiFetch<{ products: Product[] }>("/products/all-products");
}
export function getInventoryStats(){
  return apiFetch<InventoryStats>("/inventory/stats")
}
export function getLowStockProducts() {
  return apiFetch<{ products: Product[] }>("/inventory/low-stocks");
}
export async function restockProduct(
  sku: string,
  quantity: number
) {
  return apiFetch<{ product: Product}>(`/inventory/${sku}/restock`, {
    method: "POST",
    body: JSON.stringify({
      quantity,
    }),
  });
}