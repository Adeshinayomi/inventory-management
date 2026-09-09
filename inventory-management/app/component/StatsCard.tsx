import {
  Handbag,
  ArrowUp,
  Boxes,
  CircleDollarSign,
  CircleAlert
} from "lucide-react";

type Props = {
  stat: string;
  value: number;
};

const labels: Record<string, string> = {
  totalProducts: "Total Products",
  totalUnit: "Total Units",
  lowStocks: "Low Stocks",
  totalRevenue: "Inventory Value"
};

export function StatsCard({ stat, value }: Props) {
  const Icon =
    stat === "totalProducts"
      ? Handbag
      : stat === "totalUnit"
        ? Boxes
        : stat === "lowStocks"
          ? CircleAlert
          : CircleDollarSign;

  return (
    <div className="w-[240px] rounded-md border border-border bg-surface px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-success-light p-2">
          <Icon size={20} className="text-primary" />
        </div>
        <h2 className="font-medium">{labels[stat] || stat}</h2>
      </div>

      <h2 className="mt-5 text-2xl font-bold">
        {stat === "totalRevenue" && "₦"}
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