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
import { useDeleteAllChats } from "@/modules/chat/hooks/use-delete"
import { ChevronRight, Trash2 } from "lucide-react"

export function DeleteAllChats() {
    const deleleAllChats = useDeleteAllChats()

    async function handleDeleteAll() {
        await deleleAllChats.mutateAsync()
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
