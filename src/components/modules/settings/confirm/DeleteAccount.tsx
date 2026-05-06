"use client"

import {
    Dialog,
    DialogHeader,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
    DialogContent
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
    onConfirm: () => Promise<void>
}

export function ConfirmDeleteAccount({ onConfirm }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-red-500">
                    Excluir
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deseja realmente excluir sua conta</DialogTitle>
                    <DialogDescription>Essa ação apagará todos os dados</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>Cancelar</DialogClose>
                    <Button onClick={onConfirm}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
