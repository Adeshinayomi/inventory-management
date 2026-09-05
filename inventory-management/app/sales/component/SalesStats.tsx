import { StatsCard } from "@/app/component/StatsCard"
export function SalesStats(){
    return(
        <div className="flex justify-between">
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
        </div>
    )
}