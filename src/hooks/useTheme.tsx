/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { accentThemes, applyAccent, loadAccent } from "@/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useAppTheme() {
    const { theme, setTheme } = useTheme();
    const [current, setCurrent] = useState("");

    useEffect(() => {
        loadAccent();

        const saved = localStorage.getItem("accent");
        if (saved) setCurrent(saved);
    }, []);

    function changeAccent(value: string) {
        setCurrent(value);
        applyAccent(value);
    }

    return {
        theme,
        setTheme,
        changeAccent,
        current,
        colors: accentThemes,
    };
}