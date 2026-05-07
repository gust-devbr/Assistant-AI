"use client"

import { ColorThemeSelector } from "@/components/theme/themeSelector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ColorThemeCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Cor de destaque</CardTitle>
                <CardDescription>Escolha a cor usada em botões, bordas, destaques, etc.</CardDescription>
            </CardHeader>

            <CardContent>
                <ColorThemeSelector />
            </CardContent>
        </Card>
    )
}