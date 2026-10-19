"use client"
import { Trash } from "lucide-react"
import { deleteUser } from "@/lib/settings"
export function DeleteAccount(){
    const deleteUseracct = async () => {
        try {
            const response = await deleteUser();
            if (response.ok) {
                console.log("Account deleted successfully.");
            } else {
                console.error("Failed to delete account.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    }
    return(
        <div>
            <div className="w-full bg-surface p-4 flex flex-col md:flex-row md:justify-between md:w-2/3 rounded-md border border-border gap-5">
                <div className="flex items-center gap-2">
                    <Trash size={35} className="p-2 rounded-md bg-danger/25 text-danger"/>
                    <div className="grid">
                        <h1 className="font-medium">Delete Account</h1>
                        <p className="text-sm text-text-muted">Permanently delete your account and all data </p>
                    </div>
                </div>

                <button 
                    className="flex gap-2 justify-center items-center px-4 py-2 rounded-md border border-danger text-danger"
                    onClick={deleteUseracct}
                >
                    <Trash />
                    <span className="font-medium">Delete Account</span>
                </button>
            </div>
        </div>
    )
}