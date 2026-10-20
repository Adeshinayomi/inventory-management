"use client";

import { Suspense, useEffect, useState } from "react";
import { Search, Sun, Moon, MenuIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type UserProp = {
  name: string;
  email: string;
  phone: number;
  role: string;
};

type SidebarProp = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

function HeaderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("search") ?? "");
  }, [searchParams]);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      router.push("/product");
      return;
    }

    router.push(`/product?search=${encodeURIComponent(query)}`);
  }

  return (
    <form
      className="relative flex w-2/4 shrink md:w-2/3"
      onSubmit={handleSearchSubmit}
    >
      <Search
        size={20}
        className="absolute left-4 top-3 text-text-secondary"
      />

      <input
        type="search"
        placeholder="Search for products, orders, customers..."
        aria-label="Search products, orders, and customers"
        className="w-full rounded-full border border-border bg-surface px-10 py-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}

export function Header({ isOpen, toggleSidebar }: SidebarProp) {
  const [user, setUser] = useState<UserProp | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  function applyTheme(nextTheme: "light" | "dark") {
    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );
  }

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <header className="flex w-full justify-between border border-border bg-surface px-5 py-4">
      <button
        type="button"
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
        className="flex items-center md:hidden"
        onClick={toggleSidebar}
      >
        <MenuIcon size={25} />
      </button>

      <Suspense
        fallback={
          <div className="w-2/4 md:w-2/3">
            <div className="h-10 rounded-full border border-border bg-surface" />
          </div>
        }
      >
        <HeaderSearch />
      </Suspense>

      <div className="flex items-center gap-2 md:gap-5">
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Switch to light theme"
            onClick={toggleTheme}
            className={
              theme === "light" ? "text-gray-800" : "text-gray-400"
            }
          >
            <Sun size={20} />
          </button>

          <button
            type="button"
            aria-label="Switch to dark theme"
            onClick={toggleTheme}
            className={
              theme === "dark" ? "text-black" : "text-gray-400"
            }
          >
            <Moon size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="grid">
            <h1>{user?.name}</h1>
            <p className="text-sm text-text-muted">{user?.role}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-surface">
            <h1 className="text-center text-lg font-bold">
              {user?.name?.charAt(0) ?? ""}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
