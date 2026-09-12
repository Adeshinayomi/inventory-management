import {
  Handbag,
  ArrowUp,
  ShoppingCart,
  Boxes,
  CircleDollarSign,
  CircleAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { inventoryItems } from "../inventory/components/inventory-data";

type Props = {
  stat: string;
  value: number;
};

type StatConfig = {
  label: string;
  icon: LucideIcon;
  isCurrency?: boolean;
};

const statConfig: Record<string, StatConfig> = {
  totalProducts: {
    label: "Total Products",
    icon: Handbag,
  },

  totalUnit: {
    label: "Total Units",
    icon: Boxes,
  },

  lowStocks: {
    label: "Low Stocks",
    icon: CircleAlert,
  },

  inventoryValue: {
    label: "Inventory Value",
    icon: CircleDollarSign,
    isCurrency: true,
  },

  totalSales: {
    label: "Total Sales",
    icon: CircleDollarSign,
    isCurrency: true,
  },

  totalOrders: {
    label: "Total Orders",
    icon: ShoppingCart,
  },

  itemsSold: {
    label: "Items Sold",
    icon: Boxes,
  },

  averageOrderValue: {
    label: "Average Order Value",
    icon: CircleDollarSign,
    isCurrency: true,
  },
};

export function StatsCard({
  stat,
  value,
}: Props) {
  const config = statConfig[stat];

  if (!config) {
    return null;
  }

  const {
    label,
    icon: Icon,
    isCurrency,
  } = config;


  return (
    <div className="w-[240px] rounded-md border border-border bg-surface px-4 py-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-success-light p-2">
          <Icon
            size={20}
            className="text-primary"
          />
        </div>

        <h2 className="font-medium">
          {label}
        </h2>
      </div>

      {/* Value */}
      <h2 className="mt-5 text-2xl font-bold">
        {isCurrency && "₦"}
        {Number(value).toLocaleString()}
      </h2>

      <div className="mt-5 flex items-center gap-2 text-sm text-primary">
        <ArrowUp size={18} />
        <span>25.5%</span>
        <span className="text-text-secondary">vs last week</span>
      </div>
    </div>
  );
}
