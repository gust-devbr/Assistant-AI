import { useAuth } from "@/context/AuthContext"
import { useUsage } from "@/hooks/useUsage"
import { MessageCircleWarning, MessageSquareText } from "lucide-react"
import { AuthModal } from "../modules"

export function LimiteAlertScreen() {
    const { limit, used } = useUsage()
    const { user } = useAuth()

    return (
        <div>
            <header className="flex flex-col items-center gap-2">
                <MessageCircleWarning className="w-15! h-15! text-red-400" />
                <h1 className="text-white text-3xl">Limite de mensagens atigindo</h1>
                <p className="text-center">
                    Você atigiu o limite diário de mensagens
                    {!user && " permitidos para usuários não logados"}
                </p>
            </header>

            <main>
                <div className="flex flex-row items-center gap-2 border border-zinc-800 p-5 mt-5 rounded-2xl bg-zinc-800">
                    <MessageSquareText className="w-10! h-10!" />
                    <span className="flex flex-col items-center">
                        <p className="text-white">Você utilizou {used} de {limit} de mensagens</p>
                        Seu limite será reiniciado diariamente
                    </span>
                </div>
            </main>

            {!user && (
                <footer className="flex flex-col items-center gap-2 border border-zinc-800 p-3 mt-5 rounded-2xl bg-zinc-800">
                    <h1 className="text-white">Faça login ou crie uma conta para ter mais limite</h1>
                    <span className="border border-zinc-700 rounded-md bg-primary text-white">
                        <AuthModal />
                    </span>
                </footer>
            )}
        </div>
    )
}
