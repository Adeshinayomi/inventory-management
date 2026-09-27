"use client";

import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type User = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

export function ProfileInfo() {
  const [user, setUser] = useState<User | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);

      setUser(parsedUser);

      setForm({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
      });
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

    async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
    ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
        const data = await apiFetch<{user:User}>("/users/update-user", {
        method: "PUT",
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
        }),
        });

        const updatedUser: User = {
        ...user!,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        };

        setUser(updatedUser);

        localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
        );

        setMessage("Profile updated successfully.");

        // Remove success message after 3 seconds
        setTimeout(() => {
        setMessage("");
        }, 3000);

    } catch (error) {
        const errorMessage =
        error instanceof Error
            ? error.message
            : "Failed to update profile.";

        setError(errorMessage);

        // Remove error message after 3 seconds
        setTimeout(() => {
        setError("");
        }, 3000);

    } finally {
        setLoading(false);
    }
    }

  return (
    <div className="grid bg-surface px-4 py-2 rounded-md gap-7 w-1/2">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="grid gap-2">
          <h1 className="text-xl font-bold">
            Profile Information
          </h1>

          <p className="text-text-secondary text-sm">
            Manage your personal information and profile
          </p>
        </div>

        <div className="relative w-12 h-12 rounded-full flex justify-center items-center bg-primary text-surface">
          <h1 className="font-bold text-xl">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </h1>

          <EditIcon
            size={16}
            className="text-sidebar-text-active absolute left-7 top-7"
          />
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-7"
      >
        <div className="grid grid-cols-2 gap-5">

          {/* Name */}
          <div className="grid gap-2">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="px-2 py-2 border border-border rounded-md text-text-secondary text-sm bg-background"
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="px-2 py-2 border border-border rounded-md text-text-secondary text-sm bg-background"
            />
          </div>

          {/* Role */}
          <div className="grid gap-2">
            <label htmlFor="role">
              Role
            </label>

            <input
              id="role"
              type="text"
              value={user?.role || ""}
              disabled
              className="px-2 py-2 border border-border rounded-md text-text-secondary text-sm bg-background opacity-60 cursor-not-allowed"
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
              value={form.phone}
              onChange={handleChange}
              className="px-2 py-2 border border-border rounded-md text-text-secondary text-sm bg-background"
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

        {/* Save */}
        <button
          type="submit"
          disabled={loading}
          className="justify-self-end bg-primary px-4 py-2 rounded-md text-surface font-medium disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}