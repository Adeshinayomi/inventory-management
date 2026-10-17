"use client"
import { LayoutDashboard,Warehouse,Box,ChartNoAxesCombined,Settings,LogOutIcon,ShoppingCart} from "lucide-react"
import Link from "next/link"
import { LogOut } from "../component/LogOut"
import  { usePathname } from "next/navigation"
import { useState,useEffect} from "react"
import { getStore} from "@/lib/store"

type storeprop = {
  _id: string;
  storeName: string;
  storeAddress: string;
  storeEmail: string;
  storePhone: string;
}
export function Sidebar(){
    const [store, setStore] = useState<storeprop | null>(null)
    const pathname = usePathname()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        getStore()
        .then((data) => {
            setStore(data.store)
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);   
    
    const separatedWords = store?.storeName?.split(' ')

    const firstWord = separatedWords ? separatedWords[0] : '';
    const remainingWords = separatedWords ? separatedWords.slice(1).join(' ') : '';
    return(
        <>
            <nav className="hidden md:block md:w-1/5 fixed min-h-screen bg-sidebar p-5 grid gap-10 text-text-on-primary content-between">
                <div className="grid gap-10">
                    <h1 className="text-xl font-medium">
                        <Link href="/" className="flex gap-2"> 
                           <span className="text-primary">{firstWord}</span>

                           <span>{remainingWords}</span>
                        </Link>
                    </h1>

                    <ul className="w-5/6 grid gap-3 self-stretch h-full text-sm">
                        <li className={`flex gap-2 px-3 py-2 rounded-md ${pathname === "/" ? "bg-sidebar-active text-sidebar-text-active" : ""}`}>
                            <LayoutDashboard size={20} />
                            <Link href="/" className="self-center text-white ">Dashboard</Link>
                        </li>

                        <li className={`flex gap-2 px-3 py-2 rounded-md ${pathname === "/inventory" ? "bg-sidebar-active text-sidebar-text-active" : ""}`}>
                            <Warehouse size={20}/>
                            <Link href="/inventory" className="self-center text-white">Inventory</Link>
                        </li>

                        <li className={`flex gap-2 px-3 py-2 rounded-md ${pathname === "/product" ? "bg-sidebar-active text-sidebar-text-active" : ""}`}>
                            <Box size={20}/>
                            <Link href="/product" className="self-center text-white">Products</Link>
                        </li>

                        <li className={`flex gap-2 px-3 py-2 rounded-md ${pathname === "/sales/create" ? "bg-sidebar-active text-sidebar-text-active" : ""}`}>
                            <ShoppingCart size={20}/>
                            <Link href="/sales/create" className="self-center text-white">POS</Link>
                        </li>

                        <li className={`flex gap-2 px-3 py-2 rounded-md ${pathname === "/sales" ? "bg-sidebar-active text-sidebar-text-active" : ""}`}>
                            <ChartNoAxesCombined size={20}/>
                            <Link href="/sales" className="self-center text-white">Sales</Link>
                        </li>
                    </ul>
                </div>


                <ul className="text-sm">
                    <li className={`flex gap-2 px-3 py-2 rounded-md ${pathname === "/settings" ? "bg-sidebar-active text-sidebar-text-active" : ""}`}>
                        <Settings size={20}/>
                        <Link href="/settings" className="self-center text-white">Settings</Link>
                    </li>

                    <li className='flex gap-2 px-3 py-2 rounded-md' onClick={
                        ()=>{
                            setIsModalOpen((prev)=>!prev)
                        }
                    }>
                        <LogOutIcon size={20}/>
                        <span className="self-center text-white">Logout</span>
                    </li>
                </ul>
            </nav>
            <LogOut isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </>
    )
}