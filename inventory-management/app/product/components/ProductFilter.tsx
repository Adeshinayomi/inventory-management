"use client";
import { useState,useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { getCategories } from "@/lib/inventory";
type Props = {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export function ProductFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  const [category,setCategory]=useState<string[]>()

  useEffect(()=>{
    getCategories().
    then((data)=>{
        setCategory(data.categories)
    })
  },[])
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="relative w-1/2">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search Product..."
          className="w-full rounded-full border border-border px-10 py-2"
        />
      </div>

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className="rounded-full border border-border px-4 py-2"
      >
        <option value="">Categories</option>
        {category?.map((data,index)=>{
            return(
                <option key={index} value={data}>{data}</option>
            )
        })}
      </select>
    </div>
  );
}