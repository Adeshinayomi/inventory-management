"use client";

import { Ellipsis, Eye, PackagePlus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import type { Product } from "../../../lib/inventory";
import { restockProduct } from "../../../lib/inventory";

function InventoryStatus({ item }: { item: Product }) {
  const isOutOfStock = item.stock === 0;
  const isLowStock = item.stock <= item.threshold;

  if (isOutOfStock) {
    return (
      <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
        Out of Stock
      </span>
    );
  }

  if (isLowStock) {
    return (
      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
        Low Stock
      </span>
    );
  }

  return (
    <span className="bg-green-100 text-green-800 px-4 py-1 rounded">
      In Stock
    </span>
  );
}

function InventoryTableRow({ item }: { item: Product }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showRestock, setShowRestock] = useState(false);

  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [stock, setStock] = useState(item.stock);

  async function handleRestock() {
    setError("");

    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount <= 0) {
      setError("Enter a valid quantity greater than 0.");
      return;
    }

    try {
      setLoading(true);

      const data = await restockProduct(item.sku, amount);

      // Update the stock displayed in this row
      setStock(data.product.stock);

      // Reset form
      setQuantity("");
      setShowRestock(false);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to restock product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <tr className="border-b border-border">
        {/* Product */}
        <td className="flex items-center text-left text-sm py-2">
          <img
            src={item.image}
            alt={item.name}
            className="w-1/4 h-16 object-cover rounded-sm"
          />

          <span className="ml-2">{item.name}</span>
        </td>

        {/* SKU */}
        <td className="text-center text-sm py-2">
          {item.sku}
        </td>

        {/* Category */}
        <td className="text-center text-sm py-2">
          {item.category}
        </td>

        {/* Stock */}
        <td className="text-center text-sm py-2">
          {stock}
        </td>

        {/* Price */}
        <td className="text-center text-sm py-2">
          ₦{item.price.toLocaleString()}
        </td>

        {/* Threshold */}
        <td className="text-center text-sm py-2">
          {item.threshold}
        </td>

        {/* Status */}
        <td className="text-center text-sm py-2">
          <InventoryStatus
            item={{
              ...item,
              stock,
            }}
          />
        </td>

        {/* Actions */}
        <td className="relative text-sm py-2">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="w-full flex items-center justify-center gap-2 px-2 py-1 rounded-md hover:bg-background transition-colors"
          >
            <Ellipsis
              size={20}
              className="text-muted-foreground"
            />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 z-20 w-40 rounded-md border border-border bg-surface shadow-md p-1">

              {/* View */}
              <Link
                href={`/product/${item.sku}`}
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm hover:bg-background"
              >
                <Eye size={16} />
                View Product
              </Link>

              {/* Restock */}
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowRestock(true);
                  setError("");
                }}
                className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm hover:bg-background"
              >
                <PackagePlus size={16} />
                Restock
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* Restock Dialog */}
      {showRestock && (
        <tr>
          <td colSpan={8}>
            <div className="border-b border-border bg-background p-4">
              <div className="max-w-md mx-auto rounded-lg border border-border bg-surface p-5 shadow-sm">

                <div className="mb-4">
                  <h2 className="text-lg font-semibold">
                    Restock Product
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    {item.name}
                  </p>
                </div>

                <div className="space-y-4">

                  {/* Current Stock */}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Stock
                    </p>

                    <p className="text-xl font-semibold">
                      {stock} units
                    </p>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label
                      htmlFor={`quantity-${item.sku}`}
                      className="text-sm font-medium"
                    >
                      Quantity to add
                    </label>

                    <input
                      id={`quantity-${item.sku}`}
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* New Stock Preview */}
                  {quantity && Number(quantity) > 0 && (
                    <div className="rounded-md bg-primary/10 px-3 py-2 text-sm">
                      New stock:{" "}
                      <span className="font-semibold">
                        {stock + Number(quantity)} units
                      </span>
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <p className="text-sm text-red-500">
                      {error}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setShowRestock(false);
                        setQuantity("");
                        setError("");
                      }}
                      disabled={loading}
                      className="rounded-md border border-border px-4 py-2 text-sm hover:bg-background"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleRestock}
                      disabled={loading}
                      className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover disabled:opacity-50"
                    >
                      {loading ? "Restocking..." : "Restock"}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function InventoryTable({
  items,
}: {
  items: Product[];
}) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border bg-background">
          <th className="text-left text-sm py-2 w-1/5 pl-2">
            Product
          </th>

          <th className="text-center text-sm py-2 w-1/7">
            SKU
          </th>

          <th className="text-center text-sm py-2">
            Category
          </th>

          <th className="text-center text-sm py-2 w-1/7">
            Stock
          </th>

          <th className="text-center text-sm py-2">
            Price
          </th>

          <th className="text-center text-sm py-2 w-1/7">
            Threshold
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
          <InventoryTableRow
            key={item._id}
            item={item}
          />
        ))}
      </tbody>
    </table>
  );
}