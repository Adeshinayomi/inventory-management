import { Ellipsis } from "lucide-react";

import type { Product } from "../../../lib/inventory";



function InventoryStatus({ item }: { item:Product }) {
  const isLowStock = item.stock < item.threshold;
  const isOutOfStock = item.stock === 0

  return isLowStock ? (
    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Low Stock</span>
  ) :  (
    <span className="bg-green-100 text-green-800 px-4 py-1 rounded">In Stock</span>
  );
}

function InventoryTableRow({ item }: { item:Product }) {
  return (
    <tr className="border-b border-border">
      <td className="flex items-center text-left text-sm py-2">
        <img src={item.image} alt={item.name} className="w-1/4 h-16 object-cover rounded-sm"/>
        <span className="ml-2">{item.name}</span>
      </td>
      <td className="text-center text-sm py-2">{item.sku}</td>
      <td className="text-center text-sm py-2">{item.category}</td>
      <td className="text-center text-sm py-2">{item.stock}</td>
      <td className="text-center text-sm py-2">${item.price.toFixed(2)}</td>
      <td className="text-center text-sm py-2">{item.threshold}</td>
      <td className="text-center text-sm py-2">
        <InventoryStatus item={item} />
      </td>
      <td className="text-sm py-2">
        <button className="w-full flex items-center justify-center gap-2 px-2 py-1 rounded-md hover:bg-background transition-colors">
          <Ellipsis size={20} className="text-muted-foreground cursor-pointer" />
        </button>
      </td>
    </tr>
  );
}

export function InventoryTable({items}: {items: Product[]}) {
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
          <InventoryTableRow key={item._id} item={item} />
        ))}
      </tbody>
    </table>
  );
}
