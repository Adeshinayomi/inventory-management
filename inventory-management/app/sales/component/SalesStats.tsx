"use client"
import { useRouter } from "next/navigation";
import { OrderStats,getOrdersStats} from "@/lib/sales";
import { StatsCard } from "@/app/component/StatsCard"
import { useState,useEffect } from "react";
export function SalesStats(){
    const router = useRouter()
      const [stats, setStats] = useState<OrderStats>({
        totalSales: {
            value: 0,
            percentageChange: 0,
            change: "no_change"
        },
        itemsSold: {
            value: 0,
            percentageChange: 0,
            change: "no_change"
        },
        totalOrders: {
            value: 0,
            percentageChange: 0,
            change: "no_change"
        },
        averageOrderValue: {
            value: 0,
            percentageChange: 0,
            change: "no_change"
        },
        comparisonPeriod: "previous_7_days"

      });
    
      useEffect(() => {
          getOrdersStats().
          then((data)=>{
            setStats(data)
          }).catch((error)=>{
              console.log(error.message)
              router.replace('/login')
          })
      }, []);
    
    return(
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
            <StatsCard
            stat="totalSales"
            value={stats.totalSales.value}
            percentageChange={stats.totalSales.percentageChange}
            change={stats.totalSales.change}
          />
            <StatsCard
            stat="itemsSold"
            value={stats.itemsSold.value}
            percentageChange={stats.itemsSold.percentageChange}
            change={stats.itemsSold.change}
          />
            <StatsCard
            stat="totalOrders"
            value={stats.totalOrders.value}
            percentageChange={stats.totalOrders.percentageChange}
            change={stats.totalOrders.change}
          />
            <StatsCard
            stat="averageOrderValue"
            value={stats.averageOrderValue.value}
            percentageChange={stats.averageOrderValue.percentageChange}
            change={stats.averageOrderValue.change}
          />
        </div>
    )
}