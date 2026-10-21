
import { apiFetch } from "./api";

export type StatValue = {
  value: number;
  percentageChange: number;
  change: "increase" | "decrease" | "no_change";
};

export type DashboardStats = {
  totalSales: StatValue;
  totalRevenue: StatValue;
  totalUnit: StatValue;
  inventoryValue: StatValue;
  lowStocks: StatValue;
  inventoryHistoryAvailable: boolean;
  comparisonPeriod: "previous_7_days";
};

export function getDashboardStats() {
  return apiFetch<DashboardStats>("/dashboard/stats");
}
