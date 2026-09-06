'use client'
import {LogOutIcon} from 'lucide-react'
export function LogOut({isModalOpen,setIsModalOpen}:{isModalOpen:boolean,setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>}){
    return(
        <div className={`${isModalOpen?"":"hidden"} fixed top-0 right-0 w-full min-h-screen grid justify-center items-center bg-black/50 z-99`}>
            <div className="px-5 py-4 bg-surface rounded-md grid gap-5 ">
                <LogOutIcon className='justify-self-center'/>
                <h1 className='justify-self-center text-xl font-bold'>Log Out</h1>
                <p className='text-sm text-text-muted'>Are you sure you want to log out?</p>
                <div className='flex justify-between'>
                    <button className='px-5 py-2 border border-border rounded-md font-medium' onClick={
                        ()=>{
                            setIsModalOpen((prev)=>!prev)
                        }
                    }>Cancel</button>
                    <button className='px-5 py-2 border border-border rounded-md font-medium bg-danger text-surface'>Log out</button>
                </div>
            </div>
        </div>
    )
}