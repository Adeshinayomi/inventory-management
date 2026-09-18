"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Package,
  Tag,
  Layers,
  CircleDollarSign,
} from "lucide-react";
import { use, useEffect, useState } from "react";

import { getProduct, Product } from "@/lib/product";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductPage({
  params,
}: ProductPageProps) {
  const {id} = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProductBySku() {
      try {
        setLoading(true);
        setError("");

        const data = await getProduct(id);

        setProduct(data.product);
      } catch (error) {
        console.error(error);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    getProductBySku();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <div className="rounded-md border border-border bg-surface p-6">
          <p className="text-sm text-muted-foreground">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="p-6 space-y-4">
        <Link
          href="/product"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <div className="rounded-md border border-border bg-surface p-6">
          <p className="text-sm text-red-600">
            {error || "Product not found."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/product"
            className="rounded-md p-2 hover:bg-background transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">
              Product Details
            </h1>

            <p className="text-sm text-muted-foreground">
              View product information
            </p>
          </div>
        </div>

        <Link
          href={`/product/${product.sku}/update`}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover transition-colors"
        >
          <Pencil size={16} />
          Update Product
        </Link>
      </div>

      {/* Product overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Image */}
        <div className="rounded-md border border-border bg-surface p-4">
          <div className="aspect-square overflow-hidden rounded-md bg-background">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Main information */}
        <div className="lg:col-span-2 rounded-md border border-border bg-surface p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Product
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {product.name}
              </h2>
            </div>

            <span
              className={`rounded-md px-3 py-1 text-sm ${
                product.available
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.available
                ? "Available"
                : "Unavailable"}
            </span>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Description
            </p>

            <p className="mt-1 text-sm leading-6">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Product information */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* SKU */}
            <div className="rounded-md border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag size={16} />

                <span className="text-xs">
                  SKU
                </span>
              </div>

              <p className="mt-2 font-medium">
                {product.sku}
              </p>
            </div>

            {/* Stock */}
            <div className="rounded-md border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package size={16} />

                <span className="text-xs">
                  Stock
                </span>
              </div>

              <p className="mt-2 font-medium">
                {product.stock}
              </p>
            </div>

            {/* Category */}
            <div className="rounded-md border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Layers size={16} />

                <span className="text-xs">
                  Category
                </span>
              </div>

              <p className="mt-2 font-medium">
                {product.category}
              </p>
            </div>

            {/* Price */}
            <div className="rounded-md border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CircleDollarSign size={16} />

                <span className="text-xs">
                  Price
                </span>
              </div>

              <p className="mt-2 font-medium">
                ₦{product.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Threshold */}
          <div className="mt-6 rounded-md border border-border p-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Low Stock Threshold
              </span>

              <span className="text-sm font-medium">
                {product.threshold} units
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}