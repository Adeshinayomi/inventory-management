
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Package,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type Product = {
  _id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
}).format(amount);

export default function CreateSalePage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await apiFetch<{ products: Product[] }>("/products/all-products");
        setProducts(data.products ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not load products."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  function addToCart(product: Product) {
    setError("");
    setSuccess("");

    if (product.stock <= 0) {
      setError(`${product.name} is out of stock.`);
      return;
    }

    setCart((current) => {
      const existing = current.find(
        (item) => item.product._id === product._id
      );

      if (existing) {
        if (existing.quantity >= product.stock) return current;

        return current.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { product, quantity: 1 }];
    });
  }

  function changeQuantity(productId: string, change: number) {
    setCart((current) =>
      current
        .map((item) => {
          if (item.product._id !== productId) return item;

          const nextQuantity = item.quantity + change;

          if (nextQuantity <= 0) return null;
          if (nextQuantity > item.product.stock) return item;

          return { ...item, quantity: nextQuantity };
        })
        .filter((item): item is CartItem => item !== null)
    );
  }

  function removeFromCart(productId: string) {
    setCart((current) =>
      current.filter((item) => item.product._id !== productId)
    );
  }

  async function completeSale() {
    if (cart.length === 0) {
      setError("Add at least one product before completing the sale.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const data = await apiFetch<{ message: string }>("/orders/create-order", {
        method: "POST",
        body: JSON.stringify({
          items: cart.map(({ product, quantity }) => ({
            product: product._id,
            quantity,
          })),
          paymentMethod,
        }),
      });

      setSuccess(data.message || "Sale completed successfully.");
      setCart([]);

      // Refresh stock shown on the page.
      const refreshed = await apiFetch<{ products: Product[] }>("/products/all-products");
      setProducts(refreshed.products ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not complete this sale."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/sales"
              className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-green-700"
            >
              <ArrowLeft size={16} />
              Back to Sales
            </Link>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create Sale
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Select products, review the cart, and complete the transaction.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200  px-4 py-3">
            <ShoppingCart size={19} className="text-green-600" />
            <span className="text-sm font-medium">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800"
          >
            <CheckCircle2 size={18} />
            {success}
            <button
              onClick={() => router.push("/sales")}
              className="ml-auto font-semibold underline"
            >
              View sales
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] items-start gap-6">
          {/* Product selection */}
          <section className="min-w-0 rounded-2xl border border-slate-200  p-4 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Select Products</h2>
              <p className="mt-1 text-sm text-slate-500">
                Search by product name or SKU.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-green-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-slate-500">
                <LoaderCircle className="animate-spin" size={20} />
                Loading products...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <Package size={36} className="mb-3 text-slate-300" />
                <p className="font-medium">No products found</p>
                <p className="mt-1 text-sm text-slate-500">
                  Try another search or category.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
                {filteredProducts.map((product) => {
                  const inCart = cart.find(
                    (item) => item.product._id === product._id
                  );
                  const unavailable =
                    product.stock <= 0 ||
                    (inCart ? inCart.quantity >= product.stock : false);

                  return (
                    <article
                      key={product._id}
                      className="overflow-hidden rounded-xl border border-slate-200 transition hover:border-green-300 hover:shadow-sm"
                    >
                      <div className="flex h-32 items-center justify-center ">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain p-3"
                          />
                        ) : (
                          <Package size={36} className="text-slate-300" />
                        )}
                      </div>

                      <div className="space-y-3 p-3">
                        <div>
                          <h3 className="line-clamp-1 font-semibold">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            SKU: {product.sku}
                          </p>
                        </div>

                        <div className="flex items-end justify-between gap-2">
                          <div>
                            <p className="font-bold text-green-700">
                              {formatCurrency(product.price)}
                            </p>
                            <p
                              className={`mt-1 text-xs ${
                                product.stock <= 0
                                  ? "text-red-600"
                                  : product.stock <= 5
                                    ? "text-amber-600"
                                    : "text-slate-500"
                              }`}
                            >
                              Stock: {product.stock}
                            </p>
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            disabled={unavailable}
                            aria-label={`Add ${product.name} to sale`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* Current sale / cart */}
          <aside className="rounded-2xl border border-slate-200 p-4 shadow-sm sm:p-6 xl:sticky xl:top-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Current Sale</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review your selected products.
                </p>
              </div>
              <span className="rounded-lg bg-green-50 px-2.5 py-1 text-sm font-semibold text-green-700">
                {cart.length}
              </span>
            </div>

            <div className="mt-5 max-h-[360px] space-y-4 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center">
                  <ShoppingCart
                    size={30}
                    className="mx-auto mb-3 text-slate-300"
                  />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Add products to start a sale.
                  </p>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product._id}
                    className="border-b border-slate-100 pb-4 last:border-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatCurrency(product.price)} each
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(product._id)}
                        aria-label={`Remove ${product.name}`}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => changeQuantity(product._id, -1)}
                          aria-label={`Decrease ${product.name} quantity`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-5 text-center text-sm font-semibold">
                          {quantity}
                        </span>

                        <button
                          onClick={() => changeQuantity(product._id, 1)}
                          disabled={quantity >= product.stock}
                          aria-label={`Increase ${product.name} quantity`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="text-sm font-semibold">
                        {formatCurrency(product.price * quantity)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 space-y-4 border-t border-slate-200 pt-5">
              <div>
                <label
                  htmlFor="paymentMethod"
                  className="mb-2 block text-sm font-medium"
                >
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="transfer">Bank Transfer</option>
                  <option value="pos">POS</option>
                </select>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-green-700">
                  {formatCurrency(total)}
                </span>
              </div>

              <button
                onClick={completeSale}
                disabled={submitting || loading || cart.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Completing Sale...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Complete Sale
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Stock is updated when the backend confirms the sale.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}