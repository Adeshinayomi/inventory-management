
"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { type Sales, getTotalSales } from "@/lib/sales";
import { formateDate } from "@/lib/utils";

export function SalesTable() {
  const [recentSales, setRecentSales] = useState<Sales[]>([]);

  useEffect(() => {
    getTotalSales()
      .then((data) => {
        setRecentSales(data.orders.slice(0, 5));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (recentSales.length === 0) {
    return (
      <div className="border border-border grid rounded-md p-4 w-full md:w-[55%]">
        <h1 className="text-xl font-bold">Recent Sales</h1>
        <p className="text-lg text-text-muted text-center">
          Nothing to see here.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-md p-4 w-full min-w-0 md:w-[55%]">
      <div className="flex justify-between items-center mb-4 pr-4">
        <h1 className="text-xl font-bold">Recent Sales</h1>

        <Link
          href={"/sales"}
          className="text-sm text-muted-foreground hover:text-primary cursor-pointer"
        >
          View All
        </Link>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-3 md:hidden">
        {recentSales.map((sale) => (
          <div
            key={sale._id}
            className="border-b border-border py-3 min-w-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Briefcase
                  size={32}
                  className="shrink-0 text-primary bg-primary/10 p-1 rounded-sm"
                />

                <div className="min-w-0">
                  <p className="text-sm font-medium break-words">
                    #{sale.orderId}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {sale.soldBy.name}
                  </p>
                </div>
              </div>

              <span className="text-sm font-semibold shrink-0">
                ₦{sale.totalAmount}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Date</p>
                <p className="break-words">
                  {formateDate(sale.orderDate)}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-1">
                  Payment Method
                </p>
                <p className="break-words">{sale.paymentMethod}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop layout — unchanged */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead className="text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left text-md w-[150px]">Sale ID</th>
              <th className="text-left text-md w-[200px]">Sold By</th>
              <th className="text-left text-md w-[150px]">Date</th>
              <th className="text-center text-md w-[100px]">Amount</th>
              <th className="text-center text-md w-[150px]">
                Payment Method
              </th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale) => (
              <tr key={sale._id} className="border-b border-border">
                <td className="text-sm py-4 flex items-center">
                  <Briefcase
                    size={30}
                    className="inline-block mr-1 text-primary bg-primary/10 p-1 rounded-sm"
                  />
                  <span>#{sale.orderId}</span>
                </td>
                <td className="text-sm py-4">{sale.soldBy.name}</td>
                <td className="text-sm py-4">
                  {formateDate(sale.orderDate)}
                </td>
                <td className="text-sm text-center py-4">
                  ₦{sale.totalAmount}
                </td>
                <td className="text-center text-sm py-4">
                  {sale.paymentMethod}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
