"use client";

import { SearchIcon } from "lucide-react";

type Props = {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export function InventoryFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="relative w-1/2">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search inventory..."
          className="w-full rounded-full border border-border px-10 py-2"
        />
      </div>

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className="rounded-full border border-border px-4 py-2"
      >
        <option value="">All Status</option>
        <option value="In-Stock">In Stock</option>
        <option value="Low-Stock">Low Stock</option>
        <option value="Out-of-Stock">Out Of Stock</option>
      </select>
    </div>
  );
}