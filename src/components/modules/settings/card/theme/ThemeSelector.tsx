/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const options = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Escuro", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
];

export function ThemeSelector() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-3 gap-3">
                {options.map(({ value, label, icon: Icon }) => {
                    const active = theme === value;

                    return (
                        <button
                            key={value}
                            onClick={() => setTheme(value)}
                            className={`
                                flex items-center gap-2 rounded-xl border p-4
                                transition-all
                                ${active
                                    ? "border-border bg-primary dark:bg-primary"
                                    : "border-border hover:bg-ring dark:border-border dark:hover:bg-ring"}
                                `}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm">{label}</span>

                            <div className="ml-auto">
                                <div
                                    className={`
                                        w-4 h-4 rounded-full border-border
                                        ${active
                                            ? "bg-accent-foreground border border-border"
                                            : "border-border"}
                                    `}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}