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

export type StatValue = {
  value: number;
  percentageChange: number;
  change: "increase" | "decrease" | "no_change";
};

export type InventoryStats = {
  outOfStock: StatValue;
  totalUnit: StatValue;
  lowStocks: StatValue;
  inventoryValue: StatValue;
  inventoryHistoryAvailable: boolean;
  comparisonPeriod: "previous_7_days";
};

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