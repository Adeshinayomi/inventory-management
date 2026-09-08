import { Handbag,ArrowUp,Boxes, CircleDollarSign,CircleAlert} from "lucide-react"

interface props{
    stat:string,
    value:any
}
export function StatsCard({stat,value}:props){
    return(
        <div className="w-[240px] px-4 py-3 rounded-md bg-surface border border-border grid content-start gap-5">
            <div className="flex h-fit items-center">
                <div className="p-2 rounded-md bg-success-light">
                    {stat === 'totalProducts' && <Handbag  size={20} className="text-primary"/>}

                    {stat === 'totalUnit' && <Boxes  size={20} className="text-primary"/>}
                    {stat === 'lowStocks' && <CircleAlert  size={20} className="text-primary"/>}
                    {stat === 'totalRevenue' && <CircleDollarSign  size={20} className="text-primary"/>}
                </div>
                <h1 className="font-medium">{stat}</h1>
            </div>
            <h1 className="text-2xl font-bold">{stat === 'totalRevenue' && '$'} {value}</h1>
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