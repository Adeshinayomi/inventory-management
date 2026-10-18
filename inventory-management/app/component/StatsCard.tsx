import {
  Handbag,
  ArrowUp,
  ShoppingCart,
  Boxes,
  CircleDollarSign,
  CircleAlert,
  XCircle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";


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
    label: "Out Of Stock",
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
    <div className="min-w-[240px] rounded-md border border-border bg-surface px-4 py-3">
      {/* Header */}
      <div className="flex md:flex-row md:items-center gap-3 flex-col items-start">
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

      <div className="w-full justify-between mt-5 flex items-center gap-2 text-sm text-primary md:justify-start">
        <div className="flex gap-2">
          <ArrowUp size={18} />
          <span>25.5%</span>
        </div>
        <span className="text-text-secondary">vs last week</span>
      </div>
    </div>
  );
}
