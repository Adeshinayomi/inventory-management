import { apiFetch } from "./api";

export type Sales={
    _id:string,
    orderId: string,
    items: [{
        product:string,
        quantity:number,
        priceAtSale:number,
        totalAmount:number
    }],
    totalAmount:number,
    paymentMethod:string,
    soldBy: {
        _id:string,
        name:string,
        email:string
    },
    orderDate:string
}
export type OrderStats ={
    totalSales: number;
    itemsSold: number;
    totalOrders: number;
    averageOrderValue:number;
}
export function getTotalSales (){
    return apiFetch<{ orders: Sales[] }>('/orders/all-orders')
}
// export function getSalesStats(){
//     return apiFetch<OrderStats>('/orders/stats')
// }

export async function getSalesStats(
  startDate?: string,
  endDate?: string
): Promise<OrderStats> {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }

  const query = params.toString();

  return apiFetch(
    `/orders/stats${query ? `?${query}` : ""}`
  );
}


export type CategorySales = { 
    category: string; 
    sales: number;

 };
export async function getTopSellingCategories(){ 
    const data = await apiFetch<{categories:CategorySales[]}>("/orders/top-selling-category");
    return data.categories;
 }

export type MonthlySales = {
  month: string;
  sales: number;
};

export async function getMonthlySales() {
  const data = await apiFetch<{sales:MonthlySales[]}>("/orders/monthly");

  return data.sales;
}

