
"use client";

import {
  Ellipsis,
  Eye,
  PackagePlus,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import type { Product } from "../../../lib/inventory";
import { restockProduct } from "../../../lib/inventory";

function InventoryStatus({ item }: { item: Product }) {
  const isOutOfStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock <= item.threshold;

  if (isOutOfStock) {
    return (
      <span className="inline-block whitespace-nowrap rounded bg-red-100 px-2 py-1 text-xs text-red-800">
        Out of Stock
      </span>
    );
  }

  if (isLowStock) {
    return (
      <span className="inline-block whitespace-nowrap rounded bg-orange-100 px-2 py-1 text-xs text-orange-800">
        Low Stock
      </span>
    );
  }

  return (
    <span className="inline-block whitespace-nowrap rounded bg-green-100 px-2 py-1 text-xs text-green-800">
      In Stock
    </span>
  );
}

type InventoryTableProps = {
  items: Product[];
};

export function InventoryTable({ items }: InventoryTableProps) {
  const [stockBySku, setStockBySku] = useState<Record<string, number>>(
    {}
  );

  function updateStock(sku: string, stock: number) {
    setStockBySku((previous) => ({
      ...previous,
      [sku]: stock,
    }));
  }

  function getStock(item: Product) {
    return stockBySku[item.sku] ?? item.stock;
  }

  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        No products found.
      </p>
    );
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {items.map((item) => (
          <InventoryMobileCard
            key={item._id}
            item={item}
            stock={getStock(item)}
            updateStock={updateStock}
          />
        ))}
      </div>

      {/* Desktop and tablet table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="w-1/5 py-3 pl-2 text-left text-sm">
                Product
              </th>
              <th className="py-3 text-center text-sm">SKU</th>
              <th className="py-3 text-center text-sm">Category</th>
              <th className="py-3 text-center text-sm">Stock</th>
              <th className="py-3 text-center text-sm">Price</th>
              <th className="py-3 text-center text-sm">Threshold</th>
              <th className="py-3 text-center text-sm">Status</th>
              <th className="py-3 text-center text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <InventoryTableRow
                key={item._id}
                item={item}
                stock={getStock(item)}
                updateStock={updateStock}
              />
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {items.length} products
      </p>
    </>
  );
}

type ProductRowProps = {
  item: Product;
  stock: number;
  updateStock: (sku: string, stock: number) => void;
};

function InventoryTableRow({
  item,
  stock,
  updateStock,
}: ProductRowProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showRestock, setShowRestock] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      updateStock(item.sku, data.product.stock);

      setQuantity("");
      setShowRestock(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to restock product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <tr className="border-b border-border">
        <td className="py-2 pl-2 text-left text-sm">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src={item.image}
              alt={item.name}
              className="h-12 w-12 shrink-0 rounded-sm object-cover"
            />
            <span className="break-words">{item.name}</span>
          </div>
        </td>

        <td className="px-2 py-2 text-center text-sm">{item.sku}</td>
        <td className="px-2 py-2 text-center text-sm">{item.category}</td>
        <td className="px-2 py-2 text-center text-sm">{stock}</td>
        <td className="px-2 py-2 text-center text-sm">
          ₦{item.price.toLocaleString()}
        </td>
        <td className="px-2 py-2 text-center text-sm">{item.threshold}</td>

        <td className="px-2 py-2 text-center text-sm">
          <InventoryStatus item={{ ...item, stock }} />
        </td>

        <td className="relative px-2 py-2 text-sm">
          <button
            type="button"
            aria-label={`Actions for ${item.name}`}
            aria-expanded={showMenu}
            onClick={() => setShowMenu((previous) => !previous)}
            className="flex w-full items-center justify-center rounded-md px-2 py-1 hover:bg-background"
          >
            <Ellipsis size={20} className="text-muted-foreground" />
          </button>

          {showMenu && (
            <ProductActions
              item={item}
              onView={() => setShowMenu(false)}
              onRestock={() => {
                setShowMenu(false);
                setShowRestock(true);
                setError("");
              }}
            />
          )}
        </td>
      </tr>

      {showRestock && (
        <tr>
          <td colSpan={8} className="p-3">
            <RestockForm
              item={item}
              stock={stock}
              quantity={quantity}
              loading={loading}
              error={error}
              setQuantity={setQuantity}
              onCancel={() => {
                setShowRestock(false);
                setQuantity("");
                setError("");
              }}
              onSubmit={handleRestock}
            />
          </td>
        </tr>
      )}
    </>
  );
}

function InventoryMobileCard({
  item,
  stock,
  updateStock,
}: ProductRowProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showRestock, setShowRestock] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      updateStock(item.sku, data.product.stock);

      setQuantity("");
      setShowRestock(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to restock product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="rounded-lg border border-border bg-surface p-3">
      <div className="flex items-start gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="h-16 w-16 shrink-0 rounded-md object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="break-words text-sm font-semibold">
            {item.name}
          </h3>

          <p className="mt-1 break-all text-xs text-muted-foreground">
            SKU: {item.sku}
          </p>

          <p className="mt-1 break-words text-xs text-muted-foreground">
            {item.category}
          </p>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            aria-label={`Actions for ${item.name}`}
            aria-expanded={showMenu}
            onClick={() => setShowMenu((previous) => !previous)}
            className="rounded-md p-2 hover:bg-background"
          >
            <Ellipsis size={20} />
          </button>

          {showMenu && (
            <ProductActions
              item={item}
              onView={() => setShowMenu(false)}
              onRestock={() => {
                setShowMenu(false);
                setShowRestock(true);
                setError("");
              }}
            />
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Stock</p>
          <p className="mt-1 text-sm font-semibold">{stock} units</p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="mt-1 break-words text-sm font-semibold">
            ₦{item.price.toLocaleString()}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Threshold</p>
          <p className="mt-1 text-sm">{item.threshold} units</p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Status</p>
          <div className="mt-1">
            <InventoryStatus item={{ ...item, stock }} />
          </div>
        </div>
      </div>

      {showRestock && (
        <div className="mt-4 border-t border-border pt-4">
          <RestockForm
            item={item}
            stock={stock}
            quantity={quantity}
            loading={loading}
            error={error}
            setQuantity={setQuantity}
            onCancel={() => {
              setShowRestock(false);
              setQuantity("");
              setError("");
            }}
            onSubmit={handleRestock}
          />
        </div>
      )}
    </article>
  );
}

function ProductActions({
  item,
  onView,
  onRestock,
}: {
  item: Product;
  onView: () => void;
  onRestock: () => void;
}) {
  return (
    <div className="absolute right-0 top-10 z-30 w-40 rounded-md border border-border bg-surface p-1 shadow-md">
      <Link
        href={`/product/${item.sku}`}
        onClick={onView}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-background"
      >
        <Eye size={16} />
        View Product
      </Link>

      <button
        type="button"
        onClick={onRestock}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-background"
      >
        <PackagePlus size={16} />
        Restock
      </button>
    </div>
  );
}

function RestockForm({
  item,
  stock,
  quantity,
  loading,
  error,
  setQuantity,
  onCancel,
  onSubmit,
}: {
  item: Product;
  stock: number;
  quantity: string;
  loading: boolean;
  error: string;
  setQuantity: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5">
      <h2 className="text-lg font-semibold">Restock Product</h2>

      <p className="mt-1 break-words text-sm text-muted-foreground">
        {item.name}
      </p>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">Current Stock</p>
        <p className="text-xl font-semibold">{stock} units</p>
      </div>

      <div className="mt-4">
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
          step="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="Enter quantity"
          className="mt-1 w-full min-w-0 rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {quantity && Number(quantity) > 0 && (
        <div className="mt-3 rounded-md bg-primary/10 px-3 py-2 text-sm">
          New stock:{" "}
          <span className="font-semibold">
            {stock + Number(quantity)} units
          </span>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-md border border-border px-4 py-2 text-sm hover:bg-background disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover disabled:opacity-50"
        >
          {loading ? "Restocking..." : "Restock"}
        </button>
      </div>
    </div>
  );
}
