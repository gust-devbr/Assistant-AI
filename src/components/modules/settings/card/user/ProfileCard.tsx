"use client"

import { useEffect } from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserAvatar } from "@/components/avatar/UserAvatar"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { useUser } from "@/modules/user/hooks/use-user"

import {
    updateUserSchema,
    type UpdateUserSchemType,
} from "@/modules/user/schemas/update-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateUser } from "@/modules/user/hooks/use-update-user"
import { useForm } from "react-hook-form"

export function ProfileCard() {
    const { data: user } = useUser()
    const updateUser = useUpdateUser()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(updateUserSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            userName: ""
        }
    })


    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                userName: user.userName || ""
            })
        }
    }, [user, reset])

    async function onSubmit(data: UpdateUserSchemType) {
        try {
            const res = await updateUser.mutateAsync(data)

            if (res.success) {
                toast.success(res.message)
                window.location.reload()
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle className="text-2xl">Perfil</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-row justify-between items-center gap-5">
                    <UserAvatar className="md:w-35 md:h-35 w-25 h-25" />

                    <div className="flex flex-1 flex-col gap-5">
                        <section>
                            <Label className="text-[17px]" htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                className="text-[17px]! py-5"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </section>

                        <section>
                            <Label className="text-[17px]" htmlFor="userName">Nome de Usuário</Label>
                            <Input
                                id="userName"
                                {...register("userName")}
                                className="text-[17px]! py-5"
                            />
                            {errors.userName && (
                                <p className="text-sm text-red-500">
                                    {errors.userName.message}
                                </p>
                            )}
                        </section>
                    </div>
                </CardContent>

                {isDirty && (
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            className="text-[16px]"
                            onClick={() => reset()}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            className="bg-blue-600 text-white text-[16px]"
                            disabled={!isDirty || isSubmitting}
                        >
                            {isSubmitting
                                ? <Spinner className="w-5! h-5!" />
                                : "Salvar alterações"}
                        </Button>
                    </CardFooter>
                )}
            </form>
        </Card>
    )
}
