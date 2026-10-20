"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductFilters } from "./components/ProductFilter";
import { ProductHeader } from "./components/ProductHeader";
import { ProductTable } from "./components/ProductTable";
import { getInventoryProducts, type Product } from "@/lib/inventory";

function ProductPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const headerSearch = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(headerSearch);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Keep the product filter synchronized with the URL/header search.
  useEffect(() => {
    setSearch(headerSearch);
  }, [headerSearch]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getInventoryProducts();
      setProducts(data.products);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch products";

      setError(message);

      if (
        message.toLowerCase().includes("token") ||
        message.toLowerCase().includes("unauthorized") ||
        message.toLowerCase().includes("access denied")
      ) {
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const selectedCategory = category.trim().toLowerCase();

    return products.filter((product) => {
      const name = product.name?.toLowerCase() ?? "";
      const sku = product.sku?.toLowerCase() ?? "";
      const productCategory = product.category?.trim().toLowerCase() ?? "";

      const matchesSearch =
        !query || name.includes(query) || sku.includes(query);

      const matchesCategory =
        !selectedCategory || productCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <section className="mt-8 grid gap-5 px-5">
      <ProductHeader />

      <div className="grid w-full gap-5 rounded-md border border-border bg-surface p-4">
        <ProductFilters
          search={search}
          category={category}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
        />

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => void fetchProducts()}
              className="mt-2 font-medium underline"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Loading products...
          </p>
        ) : !error ? (
          <>
            <ProductTable items={filteredProducts} />

            <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>

              {/* Pagination is not active yet. */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  disabled
                  aria-label="Previous page"
                  className="rounded-md border border-border p-2 opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="rounded-md bg-primary px-3 py-2 text-sm text-white">
                  1
                </span>

                <button
                  type="button"
                  disabled
                  aria-label="Next page"
                  className="rounded-md border border-border p-2 opacity-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <section className="mt-8 px-5">
          <p className="py-10 text-center text-sm text-muted-foreground">
            Loading products...
          </p>
        </section>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}
