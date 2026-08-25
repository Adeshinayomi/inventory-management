import { LayoutDashboard,Warehouse,Box,ChartNoAxesCombined,Settings,LogOut} from "lucide-react"

export function Sidebar(){
    return(
        <nav className="w-1/5 min-h-full fixed bg-sidebar p-5 grid gap-10 text-text-on-primary content-between">
            <div className="grid gap-10">
                <h1 className="text-2xl font-medium">
                    <span className="text-primary">IN</span>VENTORY
                </h1>

                <ul className="w-5/6 grid gap-3 self-stretch h-full">
                    <li className="flex gap-2 bg-sidebar-active px-3 py-2 rounded-md">
                        <LayoutDashboard className="text-sidebar-text-active"/>
                        <span>Dashboard</span>
                    </li>

                    <li className="flex gap-2 px-3 py-2 rounded-md">
                        <Warehouse/>
                        <span>Inventory</span>
                    </li>

                    <li className="flex gap-2 px-3 py-2 rounded-md">
                        <Box/>
                        <span>Products</span>
                    </li>

                    <li className="flex gap-2 px-3 py-2 rounded-md">
                        <ChartNoAxesCombined/>
                        <span>Products</span>
                    </li>
                </ul>
            </div>


            <ul>
                <li className="flex gap-2 px-3 py-2 rounded-md">
                    <Settings/>
                    <span>Settings</span>
                </li>

                <li className="flex gap-2 px-3 py-2 rounded-md">
                    <LogOut/>
                    <span>Logout</span>
                </li>
            </ul>
        </nav>
    )
}