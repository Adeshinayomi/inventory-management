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
    soldBy: string,
    orderDate:string
}
export function getTotalSales (){
    return apiFetch<{ orders: Sales[] }>('/orders/allOrders')
}