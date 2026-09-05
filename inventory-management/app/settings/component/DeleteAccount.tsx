import { Trash } from "lucide-react"
export function DeleteAccount(){
    return(
        <div>
            <div className="bg-surface p-4 flex justify-between w-2/3 rounded-md border border-border">
                <div className="flex items-center gap-2">
                    <Trash size={35} className="p-2 rounded-md bg-danger/25 text-danger"/>
                    <div className="grid">
                        <h1 className="font-medium">Delete Account</h1>
                        <p className="text-sm tex-text-muted">Permanently delete your account and all data </p>
                    </div>
                </div>

                <button className="flex gap-2 justify-center items-center px-4 py-2 rounded-md border border-danger text-danger">
                    <Trash />
                    <span className="font-medium">Delete Account</span>
                </button>
            </div>
        </div>
    )
}