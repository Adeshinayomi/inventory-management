import { StatsCard } from "./component/StatsCard";
import { SalesTable } from "./component/SalesTable";
import  TopSellingCategory from "./component/PieChart"
import SalesChart from "./component/BarChart";

export default function Home() {
  const list=[1,2,3,4]
  return (
    <section className="grid gap-5 px-5 mt-8">
      <div className="flex justify-between">
        {list.map((index)=>{
          return(
            <StatsCard key={index}/>
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
      </div>
    </section>
  );
}
