"use client"
import { LayoutDashboard,Warehouse,Box,ChartNoAxesCombined,Settings,LogOut} from "lucide-react"
import Link from "next/link"
import  { usePathname } from "next/navigation"
export function Sidebar(){
    const pathname = usePathname()
    return(
        <nav className="w-1/5 fixed min-h-screen bg-sidebar p-5 grid gap-10 text-text-on-primary content-between">
            <div className="grid gap-10">
                <h1 className="text-xl font-medium">
                    <Link href="/" className="text-primary">IN</Link>VENTORY
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

                <li className={`flex gap-2 px-3 py-2 rounded-md ${pathname === "/logout" ? "bg-sidebar-active text-sidebar-text-active" : ""}`}>
                    <LogOut size={20}/>
                    <Link href="/logout" className="self-center text-white">Logout</Link>
                </li>
            </ul>
        </nav>
    )
}