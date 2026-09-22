"use client";

import { ArrowLeft, ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import { createProduct } from "@/lib/product";

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    threshold: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!image) {
      setError("Product image is required.");
      return;
    }

    const price = Number(form.price);
    const stock = Number(form.stock);
    const threshold = Number(form.threshold);

    if (!Number.isFinite(price) || price <= 0) {
      setError("Enter a valid price.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError("Stock must be a valid number.");
      return;
    }

    if (!Number.isInteger(threshold) || threshold < 0) {
      setError("Threshold must be a valid number.");
      return;
    }

    try {
      setLoading(true);

      await createProduct({
        name: form.name,
        description: form.description,
        price,
        stock,
        category: form.category,
        threshold,
        image,
      });

      router.push("/product");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-5 mt-8 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md p-2 hover:bg-background transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-semibold">
            Add Product
          </h1>

          <p className="text-sm text-text-secondary">
            Add a new product to your inventory.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl bg-surface border border-border rounded-md p-6"
      >
        <div className="grid gap-6">

          {/* Product Information */}
          <div>
            <h2 className="text-lg font-semibold">
              Product Information
            </h2>

            <p className="text-sm text-text-secondary mt-1">
              Enter the basic information about this product.
            </p>
          </div>

          {/* Name */}
          <div className="grid gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium"
            >
              Product Name
            </label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Premium Beef"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the product..."
              rows={4}
              required
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="grid gap-2">
              <label
                htmlFor="price"
                className="text-sm font-medium"
              >
                Price
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="category"
                className="text-sm font-medium"
              >
                Category
              </label>

              <input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Food"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h2 className="text-lg font-semibold">
              Inventory
            </h2>

            <p className="text-sm text-text-secondary mt-1">
              Set the initial stock and low-stock threshold.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Initial Stock */}
            <div className="grid gap-2">
              <label
                htmlFor="stock"
                className="text-sm font-medium"
              >
                Initial Stock
              </label>

              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Threshold */}
            <div className="grid gap-2">
              <label
                htmlFor="threshold"
                className="text-sm font-medium"
              >
                Low Stock Threshold
              </label>

              <input
                id="threshold"
                name="threshold"
                type="number"
                min="0"
                step="1"
                value={form.threshold}
                onChange={handleChange}
                placeholder="5"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Image */}
          <div className="grid gap-2">
            <label
              htmlFor="image"
              className="text-sm font-medium"
            >
              Product Image
            </label>

            <label
              htmlFor="image"
              className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-background hover:border-primary transition-colors"
            >
              <ImagePlus
                size={32}
                className="text-muted-foreground mb-2"
              />

              <span className="text-sm font-medium">
                {image
                  ? image.name
                  : "Click to upload an image"}
              </span>

              <span className="text-xs text-text-secondary mt-1">
                PNG, JPG or JPEG
              </span>

              <input
                id="image"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="rounded-md border border-border px-4 py-2 text-sm hover:bg-background transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-5 py-2 text-sm text-white hover:bg-primary-hover disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>

        </div>
      </form>
    </section>
  );
}