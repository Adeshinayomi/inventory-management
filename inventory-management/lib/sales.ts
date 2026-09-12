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
    return apiFetch<{ orders: Sales[] }>('/orders/allOrders')
}
export function getSalesStats(){
    return apiFetch<OrderStats>('/orders/order-stats')
}