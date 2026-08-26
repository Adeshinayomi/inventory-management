import { StatsCard } from "./component/StatsCard";
export default function Home() {
  const list=[1,2,3,4]
  return (
    <section className="flex justify-between px-5 mt-8">
        {list.map((index)=>{
          return(
            <StatsCard key={index}/>
          )
        })}
    </section>
  );
}
