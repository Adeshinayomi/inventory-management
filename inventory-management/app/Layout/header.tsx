"use client";

import { Search, Sun, Moon, MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type UserProp = {
  name: string;
  email: string;
  phone: number;
  role: string;
};
type sidebarProp={
  isOpen:boolean;
  toggleSidebar:()=>void
}
export function Header({isOpen,toggleSidebar}:sidebarProp) {
  const [user, setUser] = useState<UserProp | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // Keep the header input synchronized with URL searches.
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

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);

  function applyTheme(theme: "light" | "dark") {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <header className="flex w-full justify-between border border-border bg-surface px-5 py-4">
      <div className="flex items-center md:hidden " onClick={()=>{
        toggleSidebar()
      }}>
        <MenuIcon size={25} />
      </div>

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

      <div className="flex items-center gap-2 md:gap-5">
        <div className="flex gap-2">
          <Sun
            role="button"
            aria-label="Toggle theme"
            className={`cursor-pointer ${
              theme === "light" ? "text-gray-800" : "text-gray-400"
            }`}
            onClick={toggleTheme}
          />

          <Moon
            role="button"
            aria-label="Toggle theme"
            className={`cursor-pointer ${
              theme === "dark" ? "text-black" : "text-gray-400"
            }`}
            onClick={toggleTheme}
          />
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
