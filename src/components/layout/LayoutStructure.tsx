"use client"

import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function LayoutStructure({ children }: { children: ReactNode }) {
    const { user } = useAuth();

    return (
        <SidebarProvider>
            <div className="flex h-full w-full">
                {user && <AppSidebar />}

                <SidebarInset>
                    {user && <SidebarTrigger className="my-2 ml-2" />}
                    <main className="flex justify-center flex-col gap-1 text-xl h-screen text-gray-400">
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <ThemeProvider>
                                {children}
                            </ThemeProvider>
                        </ThemeProvider>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
};