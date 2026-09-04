export type ProductItem = {
  id: number;
  name: string;
  price: number;
  stockLevel: number;
  threshold: number;
};

export const ProductItems: ProductItem[] = [
  { id: 1, name: "Iphone 11", price: 699.99, stockLevel: 10, threshold: 5 },
  { id: 2, name: "Air Pods", price: 179.99, stockLevel: 3, threshold: 5 },
  { id: 3, name: "Iphone xr", price: 499.99, stockLevel: 1, threshold: 5 },
  { id: 4, name: "Smartwatch", price: 249.99, stockLevel: 2, threshold: 5 },
  { id: 5, name: "Wireless Charger", price: 39.99, stockLevel: 0, threshold: 5 },
  { id: 6, name: "Laptop", price: 1299.99, stockLevel: 15, threshold: 10 },
  { id: 7, name: "Tablet", price: 299.99, stockLevel: 8, threshold: 5 },
  { id: 8, name: "Headphones", price: 149.99, stockLevel: 12, threshold: 10 },
  { id: 9, name: "Camera", price: 349.99, stockLevel: 5, threshold: 3 },
  { id: 10, name: "Smart TV", price: 799.99, stockLevel: 20, threshold: 15 },
];
