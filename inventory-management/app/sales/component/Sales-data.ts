export type SalesItem = {
  id: number;
  customer: string;
  Date: string;
  Items: number;
  total: number;
  paymentMethod:string
};

export const SalesItems: SalesItem[] = [
  { id: 1, customer: "Iphone 11", Date: Date.toString(), Items: 10, total: 5 , paymentMethod:"paypal"},
  { id: 2, customer: "Air Pods", Date: Date.toString(), Items: 3, total: 5,paymentMethod:"paypal" },
  { id: 3, customer: "Iphone xr", Date: Date.toString(), Items: 1, total: 5,paymentMethod:"paypal"},
  { id: 4, customer: "Smartwatch", Date: Date.toString(), Items: 2, total: 5,paymentMethod:"paypal" },
  { id: 5, customer: "Wireless Charger", Date:Date.toString(), Items: 0, total: 5,paymentMethod:"paypal" },
  { id: 6, customer: "Laptop", Date: Date.toString(), Items: 15, total: 10,paymentMethod:"paypal" },
  { id: 7, customer: "Tablet", Date:Date.toString(), Items: 8, total: 5,paymentMethod:"paypal" },
  { id: 8, customer: "Headphones", Date:Date.toString() , Items: 12, total: 10,paymentMethod:"paypal" },
  { id: 9, customer: "Camera", Date:Date.toString(), Items: 5, total: 3,paymentMethod:"paypal"},
  { id: 10, customer: "Smart TV", Date:Date.toString(), Items: 20, total: 15,paymentMethod:"paypal" },
];
