import {EditIcon} from 'lucide-react'
export function StoreInfo(){
    return(
        <div className="grid bg-surface px-4 py-2 rounded-md gap-7 w-1/2">
            <div className="flex justify-between items-center">
                <div className="grid gap-2">
                    <h1 className="text-xl font-bold">Store Information</h1>
                    <p className="text-text-secondary text-sm">Manage your store and contact information</p>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-5'>
                <div className='grid gap-2'>
                    <label htmlFor="name">Store Name</label>
                    <input type="text" placeholder='Inventory' className='px-2 py-2 border border-border rounded-md'/>
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="name">Store Address</label>
                    <input type="text" placeholder='94 mba street Ajegunle' className='px-2 py-2 border border-border rounded-md'/>
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="name">Store Email</label>
                    <input type="text" placeholder='Inventory@gmail.com' className='px-2 py-2 border border-border rounded-md'/>
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="name">Phone</label>
                    <input type="text" placeholder='+234 9062433' className='px-2 py-2 border border-border rounded-md'/>
                </div>
            </div>

            <button className='justify-self-end bg-primary px-2 py-2 rounded-md text-surface font-medium'>Save Changes</button>
        </div>
    )
}