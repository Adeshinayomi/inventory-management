"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <main>{children}</main>;
  }

  return (
    <main className="flex">
      <Sidebar />
      <section className="grid w-4/5 ml-auto">
        <Header />
        {children}
      </section>
    </main>
  );
}   
