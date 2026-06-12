"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LogOut, MessageCircleCode } from "lucide-react"
import { useLogout } from "@/modules/auth/hooks/use-logout"

export function FooterCard() {
    const logout = useLogout()

    return (
        <Card>
            <CardContent className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                    <MessageCircleCode className="w-8! h-8!" />
                    <span className="flex flex-col gap-2">
                        <h3>Sobre o Assistant AI</h3>
                        <p className="text-zinc-400">Versão 2.4.0</p>
                    </span>
                </div>

                <div
                    className="text-lg flex flex-row items-center gap-2 text-red-500 cursor-pointer"
                    onClick={() => logout.mutateAsync()}
                >
                    Sair da conta
                    <LogOut />
                </div>
            </CardContent>
        </Card>
    )
}