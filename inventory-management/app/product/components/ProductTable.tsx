"use client";

import { useState } from "react";
import { Ellipsis, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteProduct } from "@/lib/product";
import type { Product } from "@/lib/inventory";

type ProductActionProps = {
  item: Product;
  onDeleted: (sku: string) => void;
};

export function ProductTable({ items }: { items: Product[] }) {
  const [deletedSkus, setDeletedSkus] = useState<string[]>([]);

  const visibleProducts = items.filter(
    (item) => !deletedSkus.includes(item.sku)
  );

  function handleDeleted(sku: string) {
    setDeletedSkus((previous) =>
      previous.includes(sku) ? previous : [...previous, sku]
    );
  }

  if (visibleProducts.length === 0) {
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
        {visibleProducts.map((item) => (
          <ProductMobileCard
            key={item._id}
            item={item}
            onDeleted={handleDeleted}
          />
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="w-1/3 py-3 pl-2 text-left text-sm">
                Product
              </th>
              <th className="py-3 text-center text-sm">SKU</th>
              <th className="py-3 text-center text-sm">Category</th>
              <th className="py-3 text-center text-sm">Price</th>
              <th className="py-3 text-center text-sm">Status</th>
              <th className="py-3 text-center text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleProducts.map((item) => (
              <ProductTableRow
                key={item._id}
                item={item}
                onDeleted={handleDeleted}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ProductTableRow({ item, onDeleted }: ProductActionProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setError("");

      await deleteProduct(item.sku);
      onDeleted(item.sku);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete product."
      );
    } finally {
      setIsDeleting(false);
      setIsMenuOpen(false);
    }
  }

  return (
    <>
      <tr className="border-b border-border last:border-b-0">
        <td className="py-4 pl-2">
          <div className="flex items-center gap-3">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-11 w-11 rounded-md border border-border object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-background text-xs text-muted-foreground">
                No image
              </div>
            )}

            <span className="font-medium">{item.name}</span>
          </div>
        </td>

        <td className="py-4 text-center text-sm">{item.sku}</td>

        <td className="py-4 text-center text-sm">{item.category}</td>

        <td className="py-4 text-center text-sm">
          {Number(item.price).toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </td>

        <td className="py-4 text-center">
          <ProductStatus available={item.available} />
        </td>

        <td className="relative py-4 text-center">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-md p-2 hover:bg-background"
            aria-label={`Actions for ${item.name}`}
            aria-expanded={isMenuOpen}
          >
            <Ellipsis size={20} />
          </button>

          {isMenuOpen && (
            <ProductActions
              item={item}
              isDeleting={isDeleting}
              onDelete={handleDelete}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </td>
      </tr>

      {error && (
        <tr>
          <td colSpan={6} className="px-2 py-2 text-sm text-red-500">
            {error}
          </td>
        </tr>
      )}
    </>
  );
}

function ProductMobileCard({ item, onDeleted }: ProductActionProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setError("");

      await deleteProduct(item.sku);
      onDeleted(item.sku);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete product."
      );
    } finally {
      setIsDeleting(false);
      setIsMenuOpen(false);
    }
  }

  return (
    <article className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-start gap-3">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-14 w-14 shrink-0 rounded-md border border-border object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-surface text-xs text-muted-foreground">
            No image
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="break-words font-medium">{item.name}</h3>
          <p className="mt-1 break-all text-xs text-muted-foreground">
            SKU: {item.sku}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {item.category}
          </p>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-md p-2 hover:bg-surface"
            aria-label={`Actions for ${item.name}`}
            aria-expanded={isMenuOpen}
          >
            <Ellipsis size={20} />
          </button>

          {isMenuOpen && (
            <ProductActions
              item={item}
              isDeleting={isDeleting}
              onDelete={handleDelete}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-3">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="mt-1 font-semibold">
            {Number(item.price).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
        </div>

        <div className="text-right">
          <p className="mb-1 text-xs text-muted-foreground">Status</p>
          <ProductStatus available={item.available} />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
    </article>
  );
}

function ProductActions({
  item,
  isDeleting,
  onDelete,
  onClose,
}: {
  item: Product;
  isDeleting: boolean;
  onDelete: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Close actions menu"
        className="fixed inset-0 z-10 cursor-default"
        onClick={onClose}
      />

      <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-md border border-border bg-surface p-1 text-left shadow-lg">
        <Link
          href={`/product/${item.sku}`}
          onClick={onClose}
          className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-background"
        >
          <Eye size={16} />
          View
        </Link>

        <Link
          href={`/product/${item.sku}/update`}
          onClick={onClose}
          className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-background"
        >
          <Pencil size={16} />
          Edit
        </Link>

        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-red-500 hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={16} />
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </>
  );
}

function ProductStatus({ available }: { available: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        available
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      }`}
    >
      {available ? "Available" : "Unavailable"}
    </span>
  );
}