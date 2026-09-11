import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formateDate(date:string){
  const formatedDate = new Date(date)
  
  return formatedDate.toLocaleDateString()
}