"use client";

import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { getCategories } from "@/lib/inventory";

type ProductFiltersProps = {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export function ProductFilters({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const data = await getCategories();

        if (!cancelled) {
          setCategories(data.categories ?? []);
          setCategoryError("");
        }
      } catch {
        if (!cancelled) {
          setCategoryError("Could not load categories.");
        }
      }
    }

    void fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full sm:w-1/2">
        <SearchIcon
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by product name or SKU..."
          aria-label="Search products"
          className="w-full rounded-full border border-border bg-background py-2 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Category filter */}
      <div className="w-full sm:w-auto">
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          aria-label="Filter products by category"
          className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary sm:min-w-44"
        >
          <option value="">All categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {categoryError && (
          <p className="mt-1 text-xs text-red-500">{categoryError}</p>
        )}
      </div>
    </div>
  );
}