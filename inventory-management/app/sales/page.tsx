"use client"

import { SalesHeader } from "./component/SalesHeader"
import { SalesStats } from "./component/SalesStats"
import { SalesFilter } from "./component/SalesFilter";
import { SalesTable } from "./component/SalesTable";
import { useState,useEffect,useMemo} from "react";
import { getTotalSales,Sales } from "@/lib/sales";
import { useRouter } from "next/navigation";

function SalesPage(){
    const router = useRouter()
    const [orders, setOrders] = useState<Sales[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
    getTotalSales()
    .then((data) => {
        setOrders(data.orders)
    }).catch((err) => {
        setError(err.message);
        router.replace('/login')
    });
    }, []);

    return(
        <section className="grid gap-5 px-5 mt-8">
            <SalesHeader />
            <SalesStats />
            <div>
                <div className="grid gap-5 w-full bg-surface border border-border rounded-md p-4">
                    <SalesFilter/>
                    <SalesTable items={orders} />
                </div>
            </div>
        </section>
    )
}

export default SalesPage