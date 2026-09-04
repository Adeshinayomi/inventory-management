import { Ellipsis } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import type { ProductItem } from "./product-data";

type ProductTableProps = {
  items: ProductItem[];
  productImage: StaticImageData;
};

function ProductStatus({ item }: { item: ProductItem }) {
  const isLowStock = item.stockLevel < item.threshold;

  return isLowStock ? (
    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Low Stock</span>
  ) : (
    <span className="bg-green-100 text-green-800 px-4 py-1 rounded">In Stock</span>
  );
}

function ProductTableRow({ item, productImage }: { item: ProductItem; productImage: StaticImageData }) {
  return (
    <tr className="border-b border-border">
      <td className="flex items-center text-left text-sm py-2">
        <Image src={productImage} alt={item.name} className="w-1/4 h-16 object-cover rounded-sm" />
        <span className="ml-2">{item.name}</span>
      </td>
      <td className="text-center text-sm py-2">SKU-{item.id}</td>
      <td className="text-center text-sm py-2">Electronics</td>
      <td className="text-center text-sm py-2">{item.stockLevel}</td>
      <td className="text-center text-sm py-2">${item.price.toFixed(2)}</td>
      <td className="text-center text-sm py-2">{item.threshold}</td>
      <td className="text-center text-sm py-2">
        <ProductStatus item={item} />
      </td>
      <td className="text-sm py-2">
        <button className="w-full flex items-center justify-center gap-2 px-2 py-1 rounded-md hover:bg-background transition-colors">
          <Ellipsis size={20} className="text-muted-foreground cursor-pointer" />
        </button>
      </td>
    </tr>
  );
}

export function ProductTable({ items, productImage }: ProductTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border bg-background">
          <th className="text-left text-sm py-2 w-1/5 pl-2">Product</th>
          <th className="text-center text-sm py-2 w-1/7">SKU</th>
          <th className="text-center text-sm py-2">Category</th>
          <th className="text-center text-sm py-2 w-1/7">Stock</th>
          <th className="text-center text-sm py-2">Price</th>
          <th className="text-center text-sm py-2 w-1/7">Threshold</th>
          <th className="text-center text-sm py-2">Status</th>
          <th className="text-center text-sm py-2 w-1/9">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <ProductTableRow key={item.id} item={item} productImage={productImage} />
        ))}
      </tbody>
    </table>
  );
}
