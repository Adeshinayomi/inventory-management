import { StatsCard } from "@/app/component/StatsCard"

export function ProductStats(){
    return(
        <div className="flex justify-between">
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
        </div>
    )
}