/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { UserAvatar } from "@/components/avatar/UserAvatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { User } from "@/types"
import { apiFetch } from "@/utils"
import { Pencil } from "lucide-react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

type currentUser = Pick<User, 'name' | 'userName'>

export function ProfileCard() {
    const { user, logout } = useAuth()

    const [isEditing, setIsEditing] = useState<string | null>(null)
    const [form, setForm] = useState<currentUser>({
        name: "",
        userName: ""
    })

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                userName: user.userName || ""
            })
        }
    }, [user])

    async function handleUpdateUser(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const { name, userName } = form

        if (!name || !userName) {
            toast.error("Preencha os campos")
            return
        }

        try {
            const data = await apiFetch("/private/user", {
                method: "PUT",
                body: JSON.stringify({
                    ...(name && { name }),
                    ...(userName && { userName })
                })
            })

            if (data.ok) {
                toast.success(data.message)
                setTimeout(() => logout(), 1000)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const disabledSubmitBtn =
        !!isEditing &&
        form.name === user?.name &&
        form.userName === user?.userName

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className="text-2xl">Perfil</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-row justify-between items-center gap-5">
                <UserAvatar className="md:w-35 md:h-35 w-25 h-25" />

                <div className="flex flex-1 flex-col gap-5">
                    <div className="w-full space-y-2 relative">
                        <Label className="text-[17px]" htmlFor="name">Nome</Label>
                        <Input
                            disabled={isEditing !== "name"}
                            id="name"
                            value={form.name}
                            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                            className="text-[17px]! py-5"
                        />
                        <button
                            onClick={() => setIsEditing(prev => (prev === "name" ? null : "name"))}
                            type="button"
                            className="absolute right-3 top-1/2 text-gray-500"
                        >
                            <Pencil />
                        </button>
                    </div>

                    <div className="w-full space-y-2 relative">
                        <Label className="text-[17px]" htmlFor="userName">Nome de Usuário</Label>
                        <Input
                            disabled={isEditing !== "userName"}
                            id="userName"
                            value={form.userName}
                            onChange={(e) => setForm(prev => ({ ...prev, userName: e.target.value }))}
                            className="text-[17px]! py-5"
                        />
                        <button
                            onClick={() => setIsEditing(prev => (prev === "userName" ? null : "userName"))}
                            type="button"
                            className="absolute right-3 top-1/2 text-gray-500"
                        >
                            <Pencil />
                        </button>
                    </div>
                </div>
            </CardContent>

            {isEditing && (
                <CardFooter className="flex justify-end gap-2">
                    <Button className="text-[16px]" onClick={() => setIsEditing(null)}>
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleUpdateUser}
                        className="bg-blue-600 text-white text-[16px]"
                        disabled={disabledSubmitBtn}
                    >
                        Salvar alterações
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
