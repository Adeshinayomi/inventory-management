import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { AppShell } from "./Layout/app-shell";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-variable",
});


export const metadata: Metadata = {
  title:"Inventory Management System",
  description:"A system for managing inventory products and orders",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}
    >
      <body className="bg-background font-inter min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
