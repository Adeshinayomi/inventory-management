"use client"
import { StatsCard } from "./component/StatsCard";
import { SalesTable } from "./component/SalesTable";
import { LowStocks } from "./component/LowStocks";
import  TopSellingCategory from "./component/PieChart"
import SalesChart from "./component/BarChart";
import { useState, useEffect } from "react";
import { getDashboardStats } from "@/lib/prouduct";

export default function Home() {
  const [dashboardStats, setDashboardStats] = useState({})

  useEffect(()=>{
    async function getStats() {
      try {
        const data = await getDashboardStats();

        setDashboardStats(data);
      } catch (error) {
        console.error("Failed to fetch total products:", error);
      }
    }

    getStats()
  },[])
  
  return (
    <section className="grid gap-5 px-5 mt-8">
      <div className="grid gap-2">
        <h1 className="text-2xl font-bold">Welcome back, Bhadmus!</h1>
        <p className="text-muted-foreground text-sm">
          here is what is happening in your store today.
        </p>
      </div>
      <div className="flex justify-between">
        {Object.entries(dashboardStats).map(([key,value])=>{
          return(
            <StatsCard key={key} stat={key} value={value}/>
          )
        })}
      </div>
      
      <div className="flex gap-2 justify-between">
        <div className="flex items-center">
          <TopSellingCategory/>
        </div>
        <div className="w-full">
          <SalesChart />
        </div>
      </div>

      <div className="flex gap-2">
        <SalesTable />
        <LowStocks />
      </div>
    </section>
  );
}
