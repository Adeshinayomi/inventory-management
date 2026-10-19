
"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

type DateRange = {
  startDate: string;
  endDate: string;
};

type Props = {
  onFilter: (range: DateRange) => void;
};

export function OrderDateFilter({ onFilter }: Props) {
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);

    if (value === "all") {
      onFilter({ startDate: "", endDate: "" });
      return;
    }

    if (value === "custom") {
      return;
    }

    const today = new Date();
    let start = new Date(today);
    let end = new Date(today);

    switch (value) {
      case "today":
        break;

      case "yesterday":
        start.setDate(today.getDate() - 1);
        end.setDate(today.getDate() - 1);
        break;

      case "thisWeek": {
        const day = today.getDay();
        const daysSinceMonday = day === 0 ? 6 : day - 1;

        start.setDate(today.getDate() - daysSinceMonday);
        break;
      }

      case "lastWeek": {
        const day = today.getDay();
        const daysSinceMonday = day === 0 ? 6 : day - 1;

        start.setDate(today.getDate() - daysSinceMonday - 7);
        end.setDate(today.getDate() - daysSinceMonday - 1);
        break;
      }

      case "thisMonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;

      case "lastMonth":
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;

      case "thisYear":
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), 11, 31);
        break;
    }

    onFilter({
      startDate: formatDate(start),
      endDate: formatDate(end),
    });
  };

  const handleCustomFilter = () => {
    if (!startDate || !endDate) {
      return;
    }

    if (startDate > endDate) {
      alert("Start date cannot be after end date");
      return;
    }

    onFilter({ startDate, endDate });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      {/* Date range selector */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:min-w-[170px] sm:flex-none">
        <label
          htmlFor="order-date-filter"
          className="text-sm text-text-secondary"
        >
          Date
        </label>

        <div className="relative">
          <CalendarDays
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />

          <select
            id="order-date-filter"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full min-w-0 appearance-none rounded-md border border-border bg-surface py-2 pl-10 pr-8 text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Orders</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="thisWeek">This Week</option>
            <option value="lastWeek">Last Week</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Custom date range */}
      {filter === "custom" && (
        <>
          <div className="flex min-w-0 flex-1 flex-col gap-1 sm:min-w-[160px]">
            <label
              htmlFor="order-start-date"
              className="text-sm text-text-secondary"
            >
              From
            </label>

            <input
              id="order-start-date"
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full min-w-0 rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1 sm:min-w-[160px]">
            <label
              htmlFor="order-end-date"
              className="text-sm text-text-secondary"
            >
              To
            </label>

            <input
              id="order-end-date"
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full min-w-0 rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="button"
            onClick={handleCustomFilter}
            disabled={!startDate || !endDate}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Apply
          </button>
        </>
      )}
    </div>
  );
}
