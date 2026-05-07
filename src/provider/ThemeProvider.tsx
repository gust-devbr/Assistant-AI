"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

export function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const saved = localStorage.getItem("accent-theme") || "blue";

        document.documentElement.setAttribute(
            "data-accent",
            saved
        );
    }, []);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}