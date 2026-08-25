import { LayoutDashboard,Warehouse,Box,ChartNoAxesCombined,Settings,LogOut} from "lucide-react"

export function Sidebar(){
    return(
        <nav className="w-1/5 min-h-full fixed bg-sidebar p-5 grid gap-10 text-text-on-primary content-between">
            <div className="grid gap-10">
                <h1 className="text-xl font-medium">
                    <span className="text-primary">IN</span>VENTORY
                </h1>

                <ul className="w-5/6 grid gap-3 self-stretch h-full text-sm">
                    <li className="flex gap-2 bg-sidebar-active px-3 py-2 rounded-md">
                        <LayoutDashboard size={20} className="text-sidebar-text-active"/>
                        <span className="self-center">Dashboard</span>
                    </li>

                    <li className="flex gap-2 px-3 py-2 rounded-md">
                        <Warehouse size={20}/>
                        <span className="self-center">Inventory</span>
                    </li>

                    <li className="flex gap-2 px-3 py-2 rounded-md">
                        <Box size={20}/>
                        <span className="self-center">Products</span>
                    </li>

                    <li className="flex gap-2 px-3 py-2 rounded-md">
                        <ChartNoAxesCombined size={20}/>
                        <span className="self-center">Products</span>
                    </li>
                </ul>
            </div>


            <ul className="text-sm">
                <li className="flex gap-2 px-3 py-2 rounded-md">
                    <Settings size={20}/>
                    <span>Settings</span>
                </li>

                <li className="flex gap-2 px-3 py-2 rounded-md">
                    <LogOut size={20}/>
                    <span>Logout</span>
                </li>
            </ul>
        </nav>
    )
}