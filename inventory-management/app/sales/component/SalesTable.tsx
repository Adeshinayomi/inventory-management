
"use client";

import { Briefcase, ChevronDown } from "lucide-react";
import { useState } from "react";

import { formateDate } from "@/lib/utils";
import type { Order } from "@/lib/sales";

type SalesTableProps = {
  items: Order[];
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
}).format(amount);

function OrderItems({
  item,
}: {
  item: Order;
}) {
  return (
    <div className="space-y-3">
      {item.items.map((orderItem) => (
        <div
          key={orderItem.product._id}
          className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface p-3"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-background">
              {orderItem.product.image ? (
                <img
                  src={orderItem.product.image}
                  alt={orderItem.product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Briefcase size={18} />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="break-words text-sm font-medium">
                {orderItem.product.name}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Quantity: {orderItem.quantity}
              </p>
            </div>
          </div>

          <p className="shrink-0 text-right text-sm font-medium">
            {formatCurrency(orderItem.totalAmount)}
          </p>
        </div>
      ))}

      <div className="space-y-3 border-t border-border pt-3 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Payment Method</span>
          <span className="text-right font-medium">
            {item.paymentMethod}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold">
            {formatCurrency(item.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}

function SalesTableRow({
  item,
  isOpen,
  onToggle,
}: {
  item: Order;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr className="border-b border-border">
        <td className="py-3 pl-2 text-left text-sm">
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="shrink-0" />
            <span className="break-all">#{item.orderId}</span>
          </div>
        </td>

        <td className="px-2 py-3 text-center text-sm">
          {item.soldBy?.name ?? "Unknown"}
        </td>

        <td className="px-2 py-3 text-center text-sm">
          {formateDate(item.orderDate)}
        </td>

        <td className="px-2 py-3 text-center text-sm">
          {item.items.length}
        </td>

        <td className="px-2 py-3 text-center text-sm">
          {formatCurrency(item.totalAmount)}
        </td>

        <td className="px-2 py-3 text-center text-sm">
          {item.paymentMethod}
        </td>

        <td className="px-2 py-3 text-center">
          <button
            type="button"
            onClick={onToggle}
            aria-label={`${isOpen ? "Collapse" : "Expand"} order ${item.orderId}`}
            aria-expanded={isOpen}
            className="rounded-md p-2 transition-colors hover:bg-background"
          >
            <ChevronDown
              size={18}
              className={`transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </td>
      </tr>

      {isOpen && (
        <tr className="border-b border-border bg-background">
          <td colSpan={7} className="p-4">
            <OrderItems item={item} />
          </td>
        </tr>
      )}
    </>
  );
}

function SalesMobileCard({
  item,
  isOpen,
  onToggle,
}: {
  item: Order;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="overflow-visible rounded-lg border border-border bg-surface p-3">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-3 text-left"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background">
          <Briefcase size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="break-all text-sm font-semibold">
            Order #{item.orderId}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {formateDate(item.orderDate)}
          </p>

          <p className="mt-1 break-words text-xs text-muted-foreground">
            Sold by: {item.soldBy?.name ?? "Unknown"}
          </p>
        </div>

        <ChevronDown
          size={20}
          className={`mt-1 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="mt-1 break-words text-sm font-semibold">
            {formatCurrency(item.totalAmount)}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Items</p>
          <p className="mt-1 text-sm font-medium">
            {item.items.length}
          </p>
        </div>

        <div className="col-span-2 min-w-0">
          <p className="text-xs text-muted-foreground">Payment Method</p>
          <p className="mt-1 break-words text-sm font-medium">
            {item.paymentMethod}
          </p>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 border-t border-border pt-4">
          <h3 className="mb-3 text-sm font-semibold">
            Order Details
          </h3>
          <OrderItems item={item} />
        </div>
      )}
    </article>
  );
}

export function SalesTable({ items }: SalesTableProps) {
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenRowId((currentId) => (currentId === id ? null : id));
  };

  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        No sales found.
      </p>
    );
  }

  return (
    <>
      {/* Mobile sales cards */}
      <div className="grid gap-3 md:hidden">
        {items.map((item) => (
          <SalesMobileCard
            key={item._id}
            item={item}
            isOpen={openRowId === item._id}
            onToggle={() => handleToggle(item._id)}
          />
        ))}
      </div>

      {/* Desktop and tablet sales table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="w-1/5 py-3 pl-2 text-left text-sm">
                Order ID
              </th>

              <th className="px-2 py-3 text-center text-sm">
                Sold By
              </th>

              <th className="px-2 py-3 text-center text-sm">
                Date
              </th>

              <th className="px-2 py-3 text-center text-sm">
                Items
              </th>

              <th className="px-2 py-3 text-center text-sm">
                Total
              </th>

              <th className="px-2 py-3 text-center text-sm">
                Payment Method
              </th>

              <th className="w-16 py-3 text-center text-sm">
                Details
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <SalesTableRow
                key={item._id}
                item={item}
                isOpen={openRowId === item._id}
                onToggle={() => handleToggle(item._id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {items.length} orders
      </p>
    </>
  );
}
