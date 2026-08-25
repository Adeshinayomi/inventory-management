import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "./Layout/sidebar";
import "./globals.css";

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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="bg-background font-inter min-h-full flex flex-col">
      
        <Sidebar />

        {children}
        
      </body>
    </html>
  );
}
