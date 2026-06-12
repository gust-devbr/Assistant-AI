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
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { ChevronRight, Trash2 } from "lucide-react"

import { ConfirmDeleteAccount } from "../../confirm/DeleteAccount"

import { useForm } from "react-hook-form"
import { useLogout } from "@/modules/auth/hooks/use-logout"
import { useDeleteAccount } from "@/modules/user/hooks/use-delete-account"

type DeleteFormData = { password: string }

export function DeleteAccountModal() {
    const logout = useLogout()
    const handleDelete = useDeleteAccount()

    const {
        handleSubmit,
        register,
        formState: { isSubmitting }
    } = useForm<DeleteFormData>()

    async function onSubmit(data: DeleteFormData) {
        try {
            const res = await handleDelete.mutateAsync(data)

            if (res.success) {
                toast.success(res.message)
                await logout.mutateAsync()
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.error(error)
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
                    disabled={isSubmitting}
                    placeholder="Senha atual"
                    {...register("password")}
                    className="text-lg"
                />

                <DialogFooter>
                    <DialogClose>
                        Cancelar
                    </DialogClose>
                    {isSubmitting
                        ? <Spinner />
                        : <ConfirmDeleteAccount onConfirm={handleSubmit(onSubmit)} />}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
