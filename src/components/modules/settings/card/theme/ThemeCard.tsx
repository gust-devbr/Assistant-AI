"use client"

import { ThemeSelector } from "./ThemeSelector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ThemeCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Tema</CardTitle>
            </CardHeader>

            <CardContent>
                <ThemeSelector />
            </CardContent>
        </Card>
    )
}