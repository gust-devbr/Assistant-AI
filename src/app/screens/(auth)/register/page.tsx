/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import { useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { AuthSidebar } from "@/modules/auth/components/auth-sidebar"

import { User2, Eye, EyeOff, Lock } from "lucide-react"

import {
    registerSchema,
    type RegisterSchemaType,
} from "@/modules/auth/schemas/register-schema"
import { useForm, Controller } from "react-hook-form"
import { useRegister } from "@/modules/auth/hooks/use-register"
import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
    const { mutateAsync } = useRegister()

    const [show, setShow] = useState<boolean>(false)

    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            userName: "",
            password: ""
        }
    })

    async function onSubmit(data: RegisterSchemaType) {
        try {
            const res = await mutateAsync(data)
            toast(res.message)
        } catch (error: unknown) {
            console.error(error)
        }
    }

    return (
        <main className="min-h-screen flex">
            <AuthSidebar side="left" />

            <section className="flex-1 flex items-center justify-center w-full md:px-40 px-10">
                <Card className="w-full">
                    <CardHeader>
                        <section className="flex md:hidden flex-row justify-center items-center">
                            <Image
                                src={require("@/assets/chatbot-icon2.png")}
                                width={70}
                                height={70}
                                alt="ChatBot Icon"
                            />

                            <p className="font-extrabold text-[18px] text-blue-700">Assistant</p>
                            <p className="text-[18px] text-blue-800">AI</p>
                        </section>

                        <CardTitle className="md:text-3xl text-xl">Crie sua conta</CardTitle>
                        <CardDescription className="md:text-lg">Comece a transformar seus estudos</CardDescription>
                    </CardHeader>

                    <CardContent className="mt-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <section className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <InputGroup className="py-5">
                                    <InputGroupInput
                                        placeholder="Sua nome"
                                        id="name"
                                        {...register("name")}
                                    />
                                    <InputGroupAddon>
                                        <Lock />
                                    </InputGroupAddon>
                                </InputGroup>
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </section>

                            <section className="space-y-2">
                                <Label htmlFor="userName">Nome de Usuário</Label>
                                <Controller
                                    name="userName"
                                    control={control}
                                    render={({ field }) => (
                                        <InputGroup className="py-5">
                                            <InputGroupInput
                                                id="userName"
                                                placeholder="Usuário"
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value
                                                            .toLowerCase()
                                                            .replace(/[^a-z]/g, "")
                                                    )
                                                }
                                            />
                                            <InputGroupAddon>
                                                <User2 />
                                            </InputGroupAddon>
                                        </InputGroup>
                                    )}
                                />
                                {errors.userName && (
                                    <p className="text-sm text-red-500">{errors.userName.message}</p>
                                )}
                            </section>

                            <section className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <InputGroup className="py-5">
                                    <InputGroupInput
                                        placeholder="Sua senha"
                                        id="password"
                                        type={show ? "text" : "password"}
                                        {...register("password")}
                                    />
                                    <InputGroupAddon>
                                        <Lock />
                                    </InputGroupAddon>

                                    <InputGroupAddon align="inline-end">
                                        <button type="button" onClick={() => setShow(!show)}>
                                            {show ? <EyeOff /> : <Eye />}
                                        </button>
                                    </InputGroupAddon>
                                </InputGroup>
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </section>

                            <footer className="flex flex-col items-center gap-5 w-full justify-center">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full text-xl text-white py-5 bg-blue-800"
                                >
                                    {isSubmitting
                                        ? <Spinner className="w-5! h-5!" />
                                        : "Criar minha conta"}
                                </Button>

                                <section className="flex flex-row gap-1 text-lg">
                                    <p>Já tem conta</p>
                                    <Link
                                        type="button"
                                        href={"/screens/login"}
                                        className="underline text-blue-600"
                                        onClick={(e) => {
                                            isSubmitting && e.preventDefault()
                                        }}
                                    >
                                        Log-in
                                    </Link>
                                </section>
                            </footer>
                        </form>
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}
