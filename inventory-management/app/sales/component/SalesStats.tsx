"use client"
import { useRouter } from "next/navigation";
import { OrderStats,getSalesStats} from "@/lib/sales";
import { StatsCard } from "@/app/component/StatsCard"
import { useState,useEffect } from "react";
export function SalesStats(){
    const router = useRouter()
      const [stats, setStats] = useState<OrderStats>({
        totalSales: 0,
        itemsSold:0,
        totalOrders: 0,
        averageOrderValue:0
      });
    
      useEffect(() => {
          getSalesStats().
          then((data)=>{
            setStats(data)
          }).catch((error)=>{
              console.log(error.message)
              router.replace('/login')
          })
      }, []);
    
    return(
        <div className="flex justify-between">
            {Object.entries(stats).map(([stat, value]) => (
            <StatsCard key={stat} stat={stat} value={value} />
            ))}
        </div>
    )
}