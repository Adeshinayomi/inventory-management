import { apiFetch } from "./api";

export type DashboardStats = {
  totalSales: number;
  totalUnit: number;
  lowStocks: number;
  totalRevenue: number;
};

export function getDashboardStats() {
  return apiFetch<DashboardStats>("/dashboard/stats");
}