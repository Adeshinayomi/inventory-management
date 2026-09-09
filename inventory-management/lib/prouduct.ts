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

export type DashboardStats = {
  totalProducts: number;
  totalUnit: number;
  lowStocks: number;
  totalRevenue: number;
};

export function getInventoryProducts() {
  return apiFetch<{ products: Product[] }>("/products/allProducts");
}

export function getDashboardStats() {
  return apiFetch<DashboardStats>("/products/dashboard-stats");
}

export function getLowStockProducts() {
  return apiFetch<{ products: Product[] }>("/inventory/lowStock");
}