"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const salesData = [
  { month: "Jan", sales: 42000 },
  { month: "Feb", sales: 58000 },
  { month: "Mar", sales: 46000 },
  { month: "Apr", sales: 72000 },
  { month: "May", sales: 65000 },
  { month: "Jun", sales: 89000 },
  { month: "Jul", sales: 76000 },
];

export default function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sales Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                vertical={false}
                className="stroke-border"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₦${value / 1000}k`}
                className="text-muted-foreground"
              />

              <Tooltip
                cursor={{ fill: "var(--color-surface)" }}
                formatter={(value) => [
                  `₦${Number(value).toLocaleString()}`,
                  "Sales",
                ]}
              />

              <Bar
                dataKey="sales"
                fill="var(--color-primary)"
                radius={[6, 6, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}