"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LimiteUsageCard } from "@/components/LimitUsageCard"
import { useUser } from "@/modules/user/hooks/use-user"

export function HeaderGroup() {
    const { data: user } = useUser()
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
                    onClick={() => router.replace(`/screens/home/${null}`)}
                    className="bg-primary"
                >
                    Voltar
                </Button>
            ) : (
                <div className="flex flex-row gap-2">
                    <Button
                        variant="secondary"
                        className="bg-primary text-lg"
                        onClick={() => router.push("/screens/login")}
                    >
                        Entrar
                    </Button>

                    <Button
                        className="text-lg"
                        variant="outline"
                        onClick={() => router.push("/screens/register")}
                    >
                        Cadastrar
                    </Button>
                </div>
            )}
        </div>
    )
}
