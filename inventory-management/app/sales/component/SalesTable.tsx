"use client";

import { ChevronDown, Briefcase } from "lucide-react";
import { useState } from "react";
import { formateDate } from "@/lib/utils";
import { Order } from "@/lib/sales";

type SalesTableProps = {
  items: Order[];
};

function SalesTableRow({
  item,
  isOpen,
  onToggle,
}: {
  item: Order;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const firstProduct = item.items[0]?.product;

  return (
    <>
      <tr className="border-b border-border">
        <td className="flex items-center text-left text-sm py-3 pl-2">
          <Briefcase size={18} />
          <span className="ml-2">#{item.orderId}</span>
        </td>


        <td className="text-center text-sm py-3">
          {item.soldBy.name}
        </td>

        <td className="text-center text-sm py-3">
          {formateDate(item.orderDate)}
        </td>

        <td className="text-center text-sm py-3">
          {item.items.length}
        </td>

        <td className="text-center text-sm py-3">
          ${item.totalAmount}
        </td>

        <td className="text-center text-sm py-3">
          {item.paymentMethod}
        </td>

        <td className="text-sm py-3">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center rounded-md px-2 py-1 hover:bg-background transition-colors"
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

      {/* Expanded order details */}
      {isOpen && (
        <tr className="border-b border-border bg-background">
          <td colSpan={7} className="p-4">
            <div className="space-y-3">
              <div className="space-y-2">
                {item.items.map((orderItem) => (
                  <div
                    key={orderItem.product._id}
                    className="flex items-center justify-between rounded-md border border-border bg-surface p-3"
                  >
                    <div className="flex items-center gap-3">
                      {/* Product thumbnail */}
                      <div className="h-12 w-12 overflow-hidden rounded-md border border-border bg-background">
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

                      <div>
                        <p className="text-sm font-medium">
                          {orderItem.product.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Quantity: {orderItem.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm">
                      ${orderItem.totalAmount}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-t border-border pt-3 text-sm">
                <span>Payment Method</span>
                <span className="font-medium">
                  {item.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Total</span>
                <span className="font-semibold">
                  ${item.totalAmount}
                </span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function SalesTable({ items }: SalesTableProps) {
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenRowId((currentId) =>
      currentId === id ? null : id
    );
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border bg-background">
          <th className="text-left text-sm py-2 w-1/5 pl-2">
            OrderId
          </th>

          <th className="text-center text-sm py-2 w-1/7">
            Sold By
          </th>

          <th className="text-center text-sm py-2">
            Date
          </th>

          <th className="text-center text-sm py-2 w-1/7">
            Items
          </th>

          <th className="text-center text-sm py-2">
            Total
          </th>

          <th className="text-center text-sm py-2 w-1/7">
            Payment Method
          </th>

          <th className="text-center text-sm py-2 w-16" />
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
  );
}