'use client'
import { Search,Sun,Moon,MenuIcon, HamburgerIcon} from "lucide-react"
import { useState,useEffect } from "react";
import {useRouter} from "next/navigation";

type userProp ={
    name:string,
    email:string,
    phone:number,
    role:string
}
export function Header(){
  const [user, setUser] = useState<userProp | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      router.push("/product");
      return;
    }

    router.push(`/product?search=${encodeURIComponent(query)}`);
  }
  

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);
  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }
  function applyTheme(theme: "light" | "dark") {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => { 
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
      } 
  }, []);
    return(
        <header className="absolute md:static top-0 right-0 px-0 md:px-5 w-full md:bg-surface md:border md:border-border py-0 md:py-4 flex flex-col-reverse md:flex-row justify-between">
            <form className="md:w-2/3 flex relative" onSubmit={handleSearchSubmit}>
                <Search size={20} className="text-text-secondary absolute left-4 top-3"/>
                <input type="search" placeholder="Search for products...." className="w-full bg-surface border border-border rounded-full px-10 py-2 md:py-0" value={searchQuery} onChange={(e)=>{
                  setSearchQuery(e.target.value);
                }}/>
            </form>
              
            <div className="flex justify-between items-center gap-5 mb-4 md:mb-0 border-b border-border md:border-none md:gap-10 bg-surface md:bg-transparent p-4 md:p-0">
                <MenuIcon size={20} className="md:hidden"/>

              <div className="flex items-center justify-end gap-5">
                  <div className="flex gap-2">
                      <Sun className={`cursor-pointer ${theme === "light" ? "text-gray-800" : "text-gray-400"}`} onClick={toggleTheme} />
                      <Moon className={`cursor-pointer ${theme === "dark" ? "text-black" : "text-gray-400"}`} onClick={toggleTheme} />
                  </div>
                  <div className="flex items-center gap-2 ">
                      <div className="grid">
                          <h1>{user?.name}</h1>
                          <p className="text-sm text-text-muted">{user?.role}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-surface">
                          <h1 className="font-bold text-lg text-center">{user?.name.charAt(0)}</h1>
                      </div>
                  </div>
              </div>
            </div>

        </header>
    )
}