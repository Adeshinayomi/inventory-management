"use client"
import { useRouter } from "next/navigation";
import { InventoryStats, getInventoryStats } from "@/lib/inventory";
import { StatsCard } from "@/app/component/StatsCard"
import { useState,useEffect } from "react";
export function Stats(){
    const router = useRouter()
      const [stats, setStats] = useState<InventoryStats>({
        outOfStock:{
            value: 0,
            percentageChange: 0,
            change: "no_change"
        },
        totalUnit:{
            value: 0,
            percentageChange: 0,
            change: "no_change"
        },
        lowStocks:{
            value: 0,
            percentageChange: 0,
            change: "no_change"
        },
        inventoryValue:{
            value: 0,
            percentageChange: 0,
            change: "no_change"
        },
        inventoryHistoryAvailable: false,
        comparisonPeriod: "previous_7_days"
      });
    
      useEffect(() => {
          getInventoryStats().
          then((data)=>{
            setStats(data)
          }).catch((error)=>{
              console.log(error.message)
          })
      }, []);
    
    return(
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between">
            <StatsCard
            stat="outOfStock"
            value={stats.outOfStock.value}
            percentageChange={stats.outOfStock.percentageChange}
            change={stats.outOfStock.change}
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
          <StatsCard
            stat="inventoryValue"
            value={stats.inventoryValue.value}
            percentageChange={stats.inventoryValue.percentageChange}
            change={stats.inventoryValue.change}
          />
        </div>
    )
}