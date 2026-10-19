"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen,setIsOpen]=useState(false)

  if (pathname === "/login") {
    return <main>{children}</main>;
  }

  function toggleSidebar(){
    return setIsOpen(prev=>!prev)
  }
  return (
    <main className="md:flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <section className="grid w-full md:w-4/5 ml-auto">
        <Header isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        {children}
      </section>
    </main>
  );
}   
