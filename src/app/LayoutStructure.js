"use client"

import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

export default function LayoutStructure({ children }) {
    const { user } = useAuth();

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                {user && <AppSidebar />}
                <Header />

                <SidebarInset>
                    <main className="bg-zinc-800 text-white">
                        {user && <SidebarTrigger className="md:hidden mb-4 mt-3 ml-2" />}
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
};