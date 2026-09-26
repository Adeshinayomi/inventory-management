"use client"
import {EditIcon} from 'lucide-react'
import { useState, useEffect} from "react";

type userProp ={
    name:string,
    email:string,
    phone:number,
    role:string
}
export function ProfileInfo(){
    const [user, setUser] = useState<userProp | null>(null);
    useEffect(() => { 
        const storedUser = localStorage.getItem("user"); 
        if (storedUser) {
        setUser(JSON.parse(storedUser)); 
        } 
    }, []);
    return(
        <div className="grid bg-surface px-4 py-2 rounded-md gap-7 w-1/2">
            <div className="flex justify-between items-center">
                <div className="grid gap-2">
                    <h1 className="text-xl font-bold">Profile Information</h1>
                    <p className="text-text-secondary text-sm">Manage your personal information and profile</p>
                </div>

                <div className="relative w-12 h-12 rounded-full flex justify-center items-center bg-primary text-surface ">
                    <h1 className="font-bold text-xl">B</h1>
                    <EditIcon className='text-sidebar-text-active absolute left-7 top-7'/>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-5'>
                <div className='grid gap-2'>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" placeholder='Bhadmus' value={user?.name} className='px-2 py-2 border border-border rounded-md text-text-secondary text-sm'/>
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="name">Email</label>
                    <input type="text" placeholder='Bhadmus@gmail.com' value={user?.email} className='px-2 py-2 border border-border rounded-md text-text-secondary text-sm'/>
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="name">Role</label>
                    <input type="text" placeholder='Admin' value={user?.role} className='px-2 py-2 border border-border rounded-md text-text-secondary text-sm'/>
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="name">Phone</label>
                    <input type="text" placeholder='+234 81645379' value={user?.phone} className='px-2 py-2 border border-border rounded-md text-text-secondary text-sm'/>
                </div>
            </div>

            <button className='justify-self-end bg-primary px-2 py-2 rounded-md text-surface font-medium'>Save Changes</button>
        </div>
    )
}