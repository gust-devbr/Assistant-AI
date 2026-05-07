"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { LogOut, MessageCircleCode } from "lucide-react"

export function FooterCard() {
    const { logout } = useAuth()

    return (
        <Card>
            <CardContent className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                    <MessageCircleCode className="w-8! h-8!" />
                    <span className="flex flex-col gap-2">
                        <h3>Sobre o Assistant AI</h3>
                        <p className="text-zinc-400">Versão 2.1.1</p>
                    </span>
                </div>

                <div
                    className="text-lg flex flex-row items-center gap-2 text-red-500 cursor-pointer"
                    onClick={logout}
                >
                    Sair da conta
                    <LogOut />
                </div>
            </CardContent>
        </Card>
    )
}