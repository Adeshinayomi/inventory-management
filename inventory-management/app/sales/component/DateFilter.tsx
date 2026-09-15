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
    return date.toISOString().split("T")[0];
  };

  const handleFilterChange = (
    value: string
  ) => {
    setFilter(value);

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

      case "thisWeek":
        {
          const day = today.getDay();

          const monday =
            day === 0 ? 6 : day - 1;

          start.setDate(
            today.getDate() - monday
          );
        }
        break;

      case "lastWeek":
        {
          const day = today.getDay();

          const monday =
            day === 0 ? 6 : day - 1;

          start.setDate(
            today.getDate() - monday - 7
          );

          end.setDate(
            today.getDate() - monday - 1
          );
        }
        break;

      case "thisMonth":
        start = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );

        end = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );

        break;

      case "lastMonth":
        start = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );

        end = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );

        break;

      case "thisYear":
        start = new Date(
          today.getFullYear(),
          0,
          1
        );

        end = new Date(
          today.getFullYear(),
          11,
          31
        );

        break;

      case "all":
        onFilter({
          startDate: "",
          endDate: "",
        });

        return;

      case "custom":
        return;
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

    onFilter({
      startDate,
      endDate,
    });
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="relative flex flex-col gap-1">
        <label className="text-sm text-text-secondary">
          Date
        </label>

        <CalendarDays className="absolute top-7.5 left-2"/>
         
        <select
          value={filter}
          onChange={(e) =>
            handleFilterChange(e.target.value)
          }
          className="rounded-md border border-border bg-surface pl-8 py-2 text-sm outline-none"
        >
          <option value="all">All Orders</option>
          <option value="today">Today</option>
          <option value="yesterday">
            Yesterday
          </option>
          <option value="thisWeek">
            This Week
          </option>
          <option value="lastWeek">
            Last Week
          </option>
          <option value="thisMonth">
            This Month
          </option>
          <option value="lastMonth">
            Last Month
          </option>
          <option value="thisYear">
            This Year
          </option>
          <option value="custom">
            Custom Range
          </option>
        </select>
      </div>

      {filter === "custom" && (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-text-secondary">
              From
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-text-secondary">
              To
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none"
            />
          </div>

          <button
            onClick={handleCustomFilter}
            className="justify-self-end rounded-md bg-primary px-4 py-2 text-sm text-white"
          >
            Apply
          </button>
        </>
      )}
    </div>
  );
}

