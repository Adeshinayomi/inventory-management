import { Lock,ChevronRight,Palette,ChevronDown,Sun,Moon,MonitorCog } from "lucide-react"
export function SecurityAndPrefences(){
    return(
        <div className="grid gap-5 bg-surface px-4 py-2 rounded-md border border-border w-1/2">
            <div className="flex justify-between items-center">
                <div className="grid gap-2">
                    <h1 className="text-xl font-bold">Security & Preference</h1>
                    <p className="text-text-secondary text-sm">Manage your security, preference and others</p>
                </div>
            </div>

            <div className="grid gap-3">
                <div className="flex justify-between items-center border-b border-border py-2">
                    <div className="flex items-center gap-2">
                        <Lock className="bg-primary/25 text-primary rounded-md p-2" size={35}/>
                        <div className="grid">
                            <h1 className="font-medium">Change Password</h1>
                            <p className="text-sm text-text-muted">Update your account password</p>
                        </div>
                    </div>

                    <ChevronRight />
                </div>
                <div className="border-b border-border py-3 grid gap-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Palette className="bg-primary/25 text-primary rounded-md p-2" size={35}/>
                            <div className="grid">
                                <h1 className="font-medium">Theme</h1>
                                <p className="text-sm text-text-muted">Set your preferred theme</p>
                            </div>
                        </div>

                        <ChevronDown />
                    </div>
                    <div className="flex justify-around items-center">
                        <div className="flex items-center px-6 py-2 rounded-md border border-primary">
                            <Sun />
                            <span>Light</span>
                        </div>
                        <div className="flex items-center px-6 py-2 rounded-md border border-border">
                            <Moon />
                            <span>Dark</span>
                        </div>   
                        <div className="flex items-center px-6 py-2 rounded-md border border-border">
                            <MonitorCog />
                            <span>System</span>
                        </div>                                             
                    </div>                 
                </div>
            </div>

            <button className='justify-self-end bg-primary px-2 py-2 rounded-md text-surface font-medium'>Save Changes</button>            
        </div>
    )
}
