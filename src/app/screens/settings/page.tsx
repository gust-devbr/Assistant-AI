import { FooterCard, ProfileCard, ThemeCard, FontSizeCard } from "@/components/modules";
import { ColorThemeCard } from "@/components/modules/settings/card/theme/ColorSelectorCard";
import { AccountCard } from "@/components/modules/settings/card/user/AccountCard";

export default function SettingsPage() {
    return (
        <div className="space-y-5 p-5 h-full">
            <header>
                <h1 className="text-3xl">Configurações</h1>
            </header>

            <main className="flex flex-col gap-5">
                <ProfileCard />

                <section className="flex md:flex-row flex-col gap-5 md:justify-between">
                    <div className="flex-1 space-y-5">
                        <ThemeCard />
                        <ColorThemeCard />
                        <FontSizeCard />
                    </div>
                    <div className="w-full md:max-w-110">
                        <AccountCard />
                    </div>
                </section>
            </main>

            <footer>
                <FooterCard />
            </footer>
        </div>
    )
}