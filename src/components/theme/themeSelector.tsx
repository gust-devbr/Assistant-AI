"use client";

import { themes } from "@/constants/themeColors";
import { setAccentTheme } from "@/lib/setAccentTheme";
import { cn } from "@/lib/utils";

export function ColorThemeSelector() {
    return (
        <div className="flex flex-wrap gap-3">
            {themes.map((theme) => (
                <button
                    key={theme.name}
                    onClick={() =>
                        setAccentTheme(theme.name)
                    }
                    className={cn(
                        "h-10 w-10 rounded-full border-2 border-border transition-transform hover:scale-110",
                        theme.color
                    )}
                />
            ))}
        </div>
    );
}