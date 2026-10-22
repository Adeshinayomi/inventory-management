import {
  Handbag,
  ArrowUp,
  ArrowDown,
  Minus,
  ShoppingCart,
  Boxes,
  CircleDollarSign,
  CircleAlert,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  stat: string;
  value: number;
  percentageChange: number;
  change: "increase" | "decrease" | "no_change";
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
  inventoryValue: {
    label: "Inventory Value",
    icon: CircleDollarSign,
    isCurrency: true,
  },
  totalUnit: {
    label: "Total Units",
    icon: Boxes,
  },
  outOfStock: {
    label: "Out of Stock",
    icon: XCircle,
  },
  lowStocks: {
    label: "Low Stocks",
    icon: CircleAlert,
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
  percentageChange,
  change,
}: Props) {
  const config = statConfig[stat];

  if (!config) return null;

  const { label, icon: Icon, isCurrency } = config;

  const isIncrease = change === "increase";
  const isDecrease = change === "decrease";

  const TrendIcon = isIncrease
    ? ArrowUp
    : isDecrease
      ? ArrowDown
      : Minus;

  const trendColor = isIncrease
    ? "text-primary"
    : isDecrease
      ? "text-red-500"
      : "text-text-secondary";

  const formattedValue = Number(value ?? 0).toLocaleString();

  return (
    <div className="min-w-[240px] rounded-md border border-border bg-surface px-4 py-3">
      {/* Header */}
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
        <div className="rounded-md bg-success-light p-2">
          <Icon size={20} className="text-primary" />
        </div>

        <h2 className="font-medium">{label}</h2>
      </div>

      {/* Value */}
      <h2 className="mt-5 text-2xl font-bold">
        {isCurrency && "₦"}
        {formattedValue}
      </h2>

      {/* Percentage change */}
      <div
        className={`mt-5 flex w-full items-center gap-2 text-sm ${trendColor}`}
      >
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon size={18} />
          <span>{Math.abs(percentageChange ?? 0).toFixed(2)}%</span>
        </div>

        <span className="text-text-secondary">vs last week</span>
      </div>
    </div>
  );
}