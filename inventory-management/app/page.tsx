"use client"
import { StatsCard } from "./component/StatsCard";
import { SalesTable } from "./component/SalesTable";
import { LowStocks } from "./component/LowStocks";
import  TopSellingCategory from "./component/PieChart"
import SalesChart from "./component/BarChart";
import { useState, useEffect } from "react";
import { getDashboardStats, type DashboardStats } from "@/lib/dashboard";
import { useRouter } from "next/navigation";
type userProp ={
    name:string,
    email:string,
    phone:number,
    role:string
}
export default function Home() {
  const [user, setUser] = useState<userProp | null>(null);
  useEffect(() => { 
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
      } 
  }, []);

  const router = useRouter()
 const [stats, setStats] = useState<DashboardStats>({
  totalSales: {
    value: 0,
    percentageChange: 0,
    change: "no_change",
  },
  totalRevenue: {
    value: 0,
    percentageChange: 0,
    change: "no_change",
  },
  totalUnit: {
    value: 0,
    percentageChange: 0,
    change: "no_change",
  },
  inventoryValue: {
    value: 0,
    percentageChange: 0,
    change: "no_change",
  },
  lowStocks: {
    value: 0,
    percentageChange: 0,
    change: "no_change",
  },
  inventoryHistoryAvailable: false,
  comparisonPeriod: "previous_7_days",
});

useEffect(() => {
  getDashboardStats()
    .then((data) => {
      setStats(data);
    })
    .catch((error) => {
      console.error("Failed to fetch dashboard stats:", error.message);
      router.replace("/login");
    });
}, [router]);
  
  return (
    <section className="grid gap-5 px-5 mt-8">
      <div className="grid gap-2">
        <h1 className="text-2xl font-bold">Welcome back,{user?.name}!</h1>
        <p className="text-muted-foreground text-sm">
          here is what is happening in your store today.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between">
<StatsCard
  stat="totalSales"
  value={stats.totalSales.value}
  percentageChange={stats.totalSales.percentageChange}
  change={stats.totalSales.change}
/>

<StatsCard
  stat="inventoryValue"
  value={stats.inventoryValue.value}
  percentageChange={stats.inventoryValue.percentageChange}
  change={stats.inventoryValue.change}
/>

<StatsCard
  stat="totalUnit"
  value={stats.totalUnit.value}
  percentageChange={stats.totalUnit.percentageChange}
  change={stats.totalUnit.change}
/>

<StatsCard
  stat="lowStocks"
  value={stats.lowStocks.value}
  percentageChange={stats.lowStocks.percentageChange}
  change={stats.lowStocks.change}
/>
      </div>
      <div className=" flex flex-col md:flex-row gap-2 justify-between">
        <div className="flex items-center">
          <TopSellingCategory/>
        </div>
        <div className="w-full">
          <SalesChart />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-2">
        <SalesTable />
        <LowStocks />
      </div>
    </section>
  );
}
