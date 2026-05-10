"use client"

import { useState } from "react";
import { FooterCard, ProfileCard, ThemeCard, FontSizeCard, SelectOptions } from "@/components/modules";
import { ColorThemeCard } from "@/components/modules/settings/card/theme/ColorSelectorCard";
import { AccountCard } from "@/components/modules/settings/card/user/AccountCard";

type SelectProps = "account" | "appearance"

export default function SettingsPage() {
    const [selected, setSelected] = useState<SelectProps>("account")

    return (
        <div className="space-y-5 p-5 h-full">
            <header className="space-y-4">
                <h1 className="text-3xl">Configurações</h1>
                <SelectOptions
                    selected={selected}
                    setSelected={setSelected}
                />
            </header>

            <main className="flex flex-col gap-5">
                {selected === "account" && <ProfileCard />}

                <section className="flex md:flex-row flex-col gap-5 md:justify-between">
                    <div className="flex-1 space-y-5" hidden={selected !== "appearance"}>
                        <ThemeCard />
                        <ColorThemeCard />
                        <FontSizeCard />
                    </div>
                    <div className="w-full" hidden={selected !== "account"}>
                        <AccountCard />
                    </div>
                </section>
            </main>

            <footer hidden={selected !== "account"}>
                <FooterCard />
            </footer>
        </div>
    )
}