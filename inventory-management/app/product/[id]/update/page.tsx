"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/lib/inventory";
import { apiFetch } from "@/lib/api";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    threshold: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiFetch<{product:Product}>(`/products/get-product/${id}`);
        const product = data.product;

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: String(product.price ?? ""),
          category: product.category || "",
          threshold: String(product.threshold ?? ""),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      await apiFetch(`/products/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          threshold: Number(form.threshold),
        }),
      });

      router.push(`/product/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading product...
      </div>
    );
  }

  return (
    <main className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href={`/products/${id}`}
          className="rounded-md p-2 hover:bg-background"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Update Product
          </h1>

          <p className="text-sm text-muted-foreground">
            Update product information
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl rounded-md border border-border bg-surface p-6"
      >
        <div className="grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Low Stock Threshold
              </label>

              <input
                name="threshold"
                type="number"
                value={form.threshold}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <Link
              href={`/product/${id}`}
              className="rounded-md border border-border px-4 py-2 text-sm hover:bg-background"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-primary px-5 py-2 text-sm text-white hover:bg-primary-hover disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}