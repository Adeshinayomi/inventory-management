"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductFilters } from "./components/ProductFilter";
import { ProductHeader } from "./components/ProductHeader";
import { ProductTable } from "./components/ProductTable";
import { getInventoryProducts, type Product } from "@/lib/inventory";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getInventoryProducts()
    .then((data) => {
        setProducts(data.products)
    }).catch((err) => {
        setError(err.message);
        router.replace('/login')
    });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        !status ||
        (status === product.category);

      return matchesSearch && matchesStatus;
    });
  }, [products, search, status]);

  return (
    <section className="grid gap-5 px-5 mt-8">
      <ProductHeader/>
      <div className="grid gap-5 w-full bg-surface border border-border rounded-md p-4">
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

        <ProductTable items={filteredProducts} />

        <div className="flex justify-between text-text-secondary">
          <p className="font-medium">
            Showing {filteredProducts.length} products
          </p>
          <div className="flex gap-2">
            <button disabled>
              <ChevronLeft />
            </button>
            <span className="rounded-md bg-primary px-2 text-surface">1</span>
            <button disabled>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}