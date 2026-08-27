"use client";

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categoryData = [
  {
    category: "Electronics",
    sales: 420,
  },
  {
    category: "Accessories",
    sales: 280,
  },
  {
    category: "Clothing",
    sales: 190,
  },
  {
    category: "Home Appliances",
    sales: 150,
  },
    {
    category: "others",
    sales: 80,
  },
];

const COLORS = [
  "var(--chart-2)",
  "var(--chart-1)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function TopSellingCategory() {
  const totalSales = categoryData.reduce(
    (total, item) => total + item.sales,
    0
  );

  const topCategory = categoryData.reduce((highest, current) =>
    current.sales > highest.sales ? current : highest
  );

  return (
    <Card className="h-full grid">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-xl">
          Top Selling Category
        </CardTitle>
      </CardHeader>

      <CardContent className="grid h-full content-between">
        <div className="flex items-center gap-6 ">
            {/* Category list */}
          <div className="flex flex-1 flex-col gap-4">
            {categoryData.map((item, index) => {
              const percentage = Math.round(
                (item.sales / totalSales) * 100
              );

              return (
                <div  key={item.category}>
                    <div
                    className="flex items-center justify-between gap-3"
                    >
                    <div className="flex min-w-0 items-center gap-2">
                        <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                            backgroundColor:
                            COLORS[index % COLORS.length],
                        }}
                        />

                        <span className="truncate text-sm text-text-secondary">
                        {item.category}
                        </span>
                    </div>

                    <span className="text-sm font-medium text-text-primary">
                        {percentage}%
                    </span>
                    </div>
                    <div className="w-full rounded-full bg-background flex ju">
                        <div className={`w-[${Number(percentage)}%] h-2 rounded-full`} style={{
                            backgroundColor:
                            COLORS[index % COLORS.length],
                        }}></div>
                    </div>
                </div>
              );
            })}
          </div>
          {/* Chart */}
          <div className="relative h-[180px] w-[180px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="sales"
                  nameKey="category"
                  innerRadius={55}
                  outerRadius={78}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={entry.category}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-text-muted">
                Total Sales
              </span>

              <span className="text-2xl font-bold text-text-primary">
                {topCategory.sales}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom summary */}
        <div className="mt-6 rounded-lg bg-surface-secondary p-3">
          <p className="text-xs text-text-muted">
            Best performing category
          </p>

          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm font-semibold text-text-primary">
              {topCategory.category}
            </span>

            <span className="text-sm font-semibold text-primary">
              {topCategory.sales} sales
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

