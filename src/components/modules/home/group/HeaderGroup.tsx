"use client"

import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AuthModal } from "../modal/AuthModal"
import { LimiteUsageCard } from "@/components/LimitUsageCard"

export function HeaderGroup() {
    const { user } = useAuth()
    const router = useRouter()

    return (
        <div className="flex flex-row justify-between w-full">
            {!user ? (
                <div className="w-full max-w-110">
                    <LimiteUsageCard />
                </div>
            ) : (
                <h1 className="text-md md:text-xl font-bold">
                    Olá {user?.name}
                </h1>
            )}

            {user ? (
                <Button
                    variant="secondary"
                    onClick={() => router.replace("/")}
                    className="bg-primary"
                >
                    Voltar
                </Button>
            ) : (
                <AuthModal />
            )}
        </div>
    )
}
