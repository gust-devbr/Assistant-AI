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
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ChevronRight, Lock } from "lucide-react"

import {
    type UpdateUserSchemType,
    updateUserSchema,
} from "@/modules/user/schemas/update-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateUser } from "@/modules/user/hooks/use-update-user"
import { useState } from "react"

export function EditPassModal() {
    const updateUser = useUpdateUser()
    const [open, setOpen] = useState<boolean>(false)

    const {
        handleSubmit,
        register,
        reset,
        formState: { isSubmitting }
    } = useForm({
        resolver: zodResolver(updateUserSchema),
        mode: "onChange",
        defaultValues: {
            password: "",
            newPassword: ""
        }
    })

    async function onSubmit(data: UpdateUserSchemType) {
        try {
            const res = await updateUser.mutateAsync(data)

            if (res.message) {
                toast.success(res.message)
                setOpen(false)
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Input
                        disabled={isSubmitting}
                        placeholder="Senha atual"
                        {...register("password")}
                        className="text-lg"
                    />

                    <Input
                        disabled={isSubmitting}
                        placeholder="Nova senha"
                        {...register("newPassword")}
                        className="text-lg"
                    />

                    <DialogFooter>
                        <DialogClose
                            type="button"
                            onClick={() => reset()}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? <Spinner className="w-5! h-5!" />
                                : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
