import { Search,Sun,Moon } from "lucide-react"
export function Header(){
    return(
        <header className="px-5 w-full bg-surface border border-border py-4 flex justify-between">
            <div className="w-2/3 flex relative">
                <Search size={20} className="text-text-muted absolute left-4 top-3"/>
                <input type="search" placeholder="Search for products, orders, customers..." className="w-full bg-background border border-border rounded-full px-10"/>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex gap-2">
                    <Sun />
                    <Moon/>
                </div>
                <div className="flex items-center gap-2 ">
                    <div className="grid">
                        <h1>Bhadmus</h1>
                        <p className="text-sm text-text-muted">Owner</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-surface">
                        <h1 className="font-bold text-lg text-center">B</h1>
                    </div>
                </div>
            </div>
        </header>
    )
}