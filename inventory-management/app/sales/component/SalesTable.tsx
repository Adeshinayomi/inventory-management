import { ChevronDown,Briefcase } from "lucide-react";

import type { SalesItem } from "./Sales-data";

type SalesTableProps = {
  items: SalesItem[];
};



function SalesTableRow({ item}: { item: SalesItem}) {
  return (
    <tr className="border-b border-border">
      <td className="flex items-center text-left text-sm py-2">
        <Briefcase  />
        <span className="ml-2">#ORD-{item.id}</span>
      </td>
      <td className="text-center text-sm py-2">{item.customer}</td>
      <td className="text-center text-sm py-2">25-10-2026</td>
      <td className="text-center text-sm py-2">{item.Items}</td>
      <td className="text-center text-sm py-2">${item.total}</td>
      <td className="text-center text-sm py-2">{item.paymentMethod}</td>
      <td className="text-sm py-2">
        <button className="w-full flex items-center justify-center gap-2 px-2 py-1 rounded-md hover:bg-background transition-colors">
          <ChevronDown />
        </button>
      </td>
    </tr>
  );
}

export function SalesTable({ items}: SalesTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border bg-background">
          <th className="text-left text-sm py-2 w-1/5 pl-2">OrderId</th>
          <th className="text-center text-sm py-2 w-1/7">customer</th>
          <th className="text-center text-sm py-2">Date</th>
          <th className="text-center text-sm py-2 w-1/7">Items</th>
          <th className="text-center text-sm py-2">Total</th>
          <th className="text-center text-sm py-2 w-1/7">Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <SalesTableRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}
