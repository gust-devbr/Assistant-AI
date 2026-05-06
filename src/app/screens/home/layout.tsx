"use client"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode } from "react"

export default function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <SidebarInset>
                    <main className="text-xl h-screen text-gray-400">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}