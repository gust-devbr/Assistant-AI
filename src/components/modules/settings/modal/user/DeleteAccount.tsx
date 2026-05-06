"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { apiFetch } from "@/utils"
import { toast } from "sonner"
import { useState } from "react"
import { ChevronRight, Trash2 } from "lucide-react"
import { ConfirmDeleteAccount } from "../../confirm/DeleteAccount"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/context/AuthContext"

export function DeleteAccountModal() {
    const { logout } = useAuth()

    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function handleDelete() {

        if (!password) {
            toast.error("Insira sua senha")
            return
        }

        try {
            setLoading(true)
            const data = await apiFetch("/private/user", {
                method: "DELETE",
                body: JSON.stringify({ password })
            })

            if (data.ok) {
                toast.success(data.message)
                await logout()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex flex-row items-center justify-between gap-2 text-red-500">
                    <span className="flex flex-row items-center gap-2">
                        <Trash2 />
                        Excluir conta
                    </span>
                    <ChevronRight />
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deletar Conta</DialogTitle>
                    <DialogDescription>Insira sua senha para excluir sua conta</DialogDescription>
                </DialogHeader>

                <Input
                    disabled={loading}
                    placeholder="Senha atual"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="text-lg"
                />

                <DialogFooter>
                    <DialogClose>
                        Cancelar
                    </DialogClose>
                    {loading
                        ? <Spinner />
                        : <ConfirmDeleteAccount onConfirm={handleDelete} />}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
