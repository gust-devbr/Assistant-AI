"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { apiFetch } from "@/utils"
import { ChevronRight, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function DeleteAllChats() {
    const router = useRouter()

    async function handleDeleteAll() {
        await apiFetch("/private/chat/delete-all", { method: "DELETE" })
        setTimeout(() => router.refresh(), 800)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex flex-row items-center justify-between gap-2 text-zinc-500">
                    <span className="flex flex-row items-center gap-2">
                        <Trash2 />
                        Limpar histórico de chats
                    </span>
                    <ChevronRight />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza disso?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita.Todos os seus Chats e Mensagens serão excluídos permanentemente
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAll}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
