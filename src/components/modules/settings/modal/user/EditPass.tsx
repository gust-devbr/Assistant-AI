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
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronRight, Lock, Trash2 } from "lucide-react"
import { ConfirmDeleteAccount } from "../../confirm/DeleteAccount"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/context/AuthContext"

export function EditPassModal() {
    const { logout } = useAuth()

    const [password, setPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function handleSubmit() {

        if (!password || !newPassword) {
            toast.error("Insira sua senha")
            return
        }

        try {
            setLoading(true)
            const data = await apiFetch("/private/user", {
                method: "PUT",
                body: JSON.stringify({
                    password,
                    newPassword
                })
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
                <div className="flex flex-row items-center justify-between gap-2 text-zinc-500">
                    <span className="flex flex-row items-center gap-2">
                        <Lock />
                        Alterar senha
                    </span>
                    <ChevronRight />
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Alterar senha</DialogTitle>
                    <DialogDescription>Insira uma nova senha para alterar</DialogDescription>
                </DialogHeader>

                <Input
                    disabled={loading}
                    placeholder="Senha atual"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="text-lg"
                />

                <Input
                    disabled={loading}
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="text-lg"
                />

                <DialogFooter>
                    <DialogClose>
                        Cancelar
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={!password || !newPassword}>
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
