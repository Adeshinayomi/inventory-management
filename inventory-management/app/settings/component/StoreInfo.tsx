"use client";

import { useEffect, useState } from "react";
import { getStore, updateStore } from "@/lib/store";

type StoreForm = {
  name: string;
  address: string;
  email: string;
  phone: string;
};

export function StoreInfo() {
  const [store, setStore] = useState<StoreForm>({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStore() {
      try {
        const data = await getStore();

        setStore({
          name: data.store.name || "",
          address: data.store.address || "",
          email: data.store.email || "",
          phone: data.store.phone || "",
        });
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load store information."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStore();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setStore((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      await updateStore(store);

      setMessage("Store information updated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update store information."
      );

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="grid bg-surface px-4 py-6 rounded-md gap-7 w-1/2">
        <p className="text-sm text-text-muted">
          Loading store information...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid bg-surface px-4 py-2 rounded-md gap-7 w-1/2"
    >
      <div className="flex justify-between items-center">
        <div className="grid gap-2">
          <h1 className="text-xl font-bold">
            Store Information
          </h1>

          <p className="text-text-secondary text-sm">
            Manage your store and contact information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">

        {/* Store Name */}
        <div className="grid gap-2">
          <label htmlFor="name">
            Store Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={store.name}
            onChange={handleChange}
            placeholder="Inventory"
            className="px-2 py-2 border border-border rounded-md text-text-secondary text-sm bg-background"
          />
        </div>

        {/* Address */}
        <div className="grid gap-2">
          <label htmlFor="address">
            Store Address
          </label>

          <input
            id="address"
            name="address"
            type="text"
            value={store.address}
            onChange={handleChange}
            placeholder="94 Mba Street, Ajegunle"
            className="px-2 py-2 border border-border text-text-secondary text-sm rounded-md bg-background"
          />
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <label htmlFor="email">
            Store Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={store.email}
            onChange={handleChange}
            placeholder="inventory@gmail.com"
            className="px-2 py-2 border border-border text-text-secondary text-sm rounded-md bg-background"
          />
        </div>

        {/* Phone */}
        <div className="grid gap-2">
          <label htmlFor="phone">
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={store.phone}
            onChange={handleChange}
            placeholder="+234 9062433"
            className="px-2 py-2 border border-border text-text-secondary text-sm rounded-md bg-background"
          />
        </div>
      </div>

      {/* Feedback */}
      {message && (
        <p className="text-sm text-green-600">
          {message}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="justify-self-end bg-primary px-3 py-2 rounded-md text-surface font-medium disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}