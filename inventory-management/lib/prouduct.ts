import { apiFetch } from "./api";

export function getDashboardStats(){
    return apiFetch('/products/dashboard-stats')
}