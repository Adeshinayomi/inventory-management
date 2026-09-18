"use client";

import { Ellipsis, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { Product } from "../../../lib/inventory";

function ProductStatus({ item }: { item: Product }) {
  if (!item.available) {
    return (
      <span className="rounded bg-red-100 px-2 py-1 text-red-800">
        unavailable
      </span>
    );
  }

  return (
    <span className="rounded bg-green-100 px-4 py-1 text-green-800">
      available
    </span>
  );
}

function ProductTableRow({ item }: { item:Product}) {
  const [open, setOpen] = useState(false);

  return (
    <tr className="border-b border-border">
      <td className="flex items-center text-left text-sm py-2">
        <img
          src={item.image}
          alt={item.name}
          className="w-1/4 h-16 object-cover rounded-sm"
        />

        <span className="ml-2">{item.name}</span>
      </td>

      <td className="text-center text-sm py-2">
        {item.sku}
      </td>

      <td className="text-center text-sm py-2">
        {item.category}
      </td>

      <td className="text-center text-sm py-2">
        ₦{item.price.toFixed(2)}
      </td>

      <td className="text-center text-sm py-2">
        <ProductStatus item={item} />
      </td>

      {/* Actions */}
      <td className="relative text-sm py-2">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-center rounded-md p-1 hover:bg-background transition-colors"
        >
          <Ellipsis
            size={20}
            className="text-muted-foreground"
          />
        </button>

        {open && (
          <div className="absolute right-4 top-10 z-50 w-36 rounded-md border border-border bg-surface p-1 shadow-md">
            <Link
              href={`/product/${item.sku}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-background transition-colors"
            >
              <Eye size={16} />
              View
            </Link>

            <Link
              href={`/product/${item.sku}/update`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-background transition-colors"
            >
              <Pencil size={16} />
              Update
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                // Delete logic will go here
              }}
              className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export function ProductTable({ items }: { items: Product[] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border bg-background">
          <th className="text-left text-sm py-2 w-1/3 pl-2">
            Product
          </th>

          <th className="text-center text-sm py-2 w-1/7">
            SKU
          </th>

          <th className="text-center text-sm py-2">
            Category
          </th>

          <th className="text-center text-sm py-2">
            Price
          </th>

          <th className="text-center text-sm py-2">
            Status
          </th>

          <th className="text-center text-sm py-2 w-1/9">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <ProductTableRow
            key={item._id}
            item={item}
          />
        ))}
      </tbody>
    </table>
  );
}