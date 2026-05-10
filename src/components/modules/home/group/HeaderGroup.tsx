"use client"

import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AuthModal } from "../modal/AuthModal"

export function HeaderGroup() {
    const { user } = useAuth()
    const router = useRouter()

    return (
        <div className="flex flex-row justify-between w-full">
            <h1 className="text-md md:text-xl font-bold">
                {user ? `Olá ${user.name}` : "Olá Anônimo"}
            </h1>

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
