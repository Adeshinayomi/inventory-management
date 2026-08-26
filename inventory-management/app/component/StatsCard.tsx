import { Handbag,ArrowUp } from "lucide-react"
export function StatsCard(){
    return(
        <div className="w-[240px] px-4 py-3 rounded-md bg-surface border border-border grid content-start gap-5">
            <div className="flex h-fit items-center">
                <div className="p-2 rounded-md bg-success-light">
                    <Handbag size={20} className="text-primary"/>
                </div>
                <h1 className="font-medium">Total Products</h1>
            </div>
            <h1 className="text-2xl font-bold">2,500+</h1>
            <div className="flex gap-2 items-center">
                <div className="w-fit flex gap-2 p-2 rounded-md bg-success-light text-primary text-sm">
                    <ArrowUp size={20}/>
                    <span>25.5%</span>
                </div>
                <p className="text-text-secondary text-sm">vs last week</p>
            </div>
        </div>
    )
}