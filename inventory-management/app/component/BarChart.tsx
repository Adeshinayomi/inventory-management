"use client";

import { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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

import {
  getMonthlySales,
  type MonthlySales,
} from "@/lib/sales";

export default function SalesChart() {
  const [salesData, setSalesData] = useState<MonthlySales[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);

        const data = await getMonthlySales();

        setSalesData(data);
      } catch (error) {
        console.error("Error fetching monthly sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Sales Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex h-[350px] items-center justify-center">
            <p className="text-sm text-text-muted">
              Loading sales...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Sales Overview
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
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
                tickFormatter={(value) =>
                  `₦${value / 1}`
                }
                className="text-muted-foreground"
              />

              <Tooltip
                cursor={{
                  fill: "var(--color-surface)",
                }}
                formatter={(value) => [
                  `₦${Number(value).toLocaleString()}`,
                  "Sales",
                ]}
              />

              <Bar
                dataKey="sales"
                radius={[6, 6, 0, 0]}
              >
                {salesData.map((entry) => (
                  <Cell
                    key={entry.month}
                    fill={
                      entry.month === "Apr" ||
                      entry.month === "Jun" ||
                      entry.month === "Jul"
                        ? "var(--color-primary)"
                        : "var(--color-surface-secondary)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

