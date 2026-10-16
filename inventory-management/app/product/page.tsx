"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductFilters } from "./components/ProductFilter";
import { ProductHeader } from "./components/ProductHeader";
import { ProductTable } from "./components/ProductTable";
import { getInventoryProducts, type Product } from "@/lib/inventory";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products whenever the URL search query changes.
  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getInventoryProducts(searchQuery);

        if (!cancelled) {
          setProducts(data.products);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message
              : "Failed to fetch products";

          setError(message);

          // Redirect only when the request indicates an authentication failure.
          if (
            message.toLowerCase().includes("token") ||
            message.toLowerCase().includes("unauthorized") ||
            message.toLowerCase().includes("access denied")
          ) {
            router.replace("/login");
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [searchQuery, router]);

  // Apply local search and category filtering to the fetched products.
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query);

      const matchesCategory =
        !status ||
        status === "all" ||
        product.category === status;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, status]);

  return (
    <section className="mt-8 grid gap-5 px-5">
      <ProductHeader />

      <div className="grid w-full gap-5 rounded-md border border-border bg-surface p-4">
        <ProductFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        {error && (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-6 text-center text-text-secondary">
            Loading products...
          </p>
        ) : (
          <>
            <ProductTable items={filteredProducts} />

            <div className="flex justify-between text-text-secondary">
              <p className="font-medium">
                Showing {filteredProducts.length} products
              </p>

              <div className="flex gap-2">
                <button type="button" disabled aria-label="Previous page">
                  <ChevronLeft />
                </button>

                <span className="rounded-md bg-primary px-2 text-surface">
                  1
                </span>

                <button type="button" disabled aria-label="Next page">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
