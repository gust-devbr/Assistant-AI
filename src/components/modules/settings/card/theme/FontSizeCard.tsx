/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

export function FontSizeCard() {
    const [fontSize, setFontSize] = useState<number>(16)

    useEffect(() => {
        const saved =
            localStorage.getItem("fontSize")

        if (saved) {
            const size = Number(saved)

            setFontSize(size)

            document.documentElement.style.setProperty(
                "--font-size",
                `${size}px`
            )
        }
    }, [])

    function handleChange(value: number) {
        setFontSize(value)

        setTimeout(() => {
            document.documentElement.style.setProperty(
                "--font-size",
                `${value}px`
            )

            localStorage.setItem(
                "fontSize",
                String(value)
            )
        }, 150)
    }

    return (
        <Card>
            <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-xl">
                        Tamanho da fonte
                    </p>

                    <span className="text-sm text-zinc-500">
                        {fontSize}px
                    </span>
                </div>

                <input
                    type="range"
                    min={12}
                    max={24}
                    step={1}
                    value={fontSize}
                    onChange={(e) => handleChange(Number(e.target.value))}
                    className="
                    w-full
                    cursor-pointer
                    accent-blue-500
                    "
                />
            </CardContent>
        </Card>
    )
}