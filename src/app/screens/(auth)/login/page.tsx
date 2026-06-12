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
import { Separator } from "@/components/ui/separator"

import { AuthSidebar } from "@/modules/auth/components/auth-sidebar"

import { User2, Eye, EyeOff, Lock } from "lucide-react"

import {
    loginSchema,
    type LoginSchemaType,
} from "@/modules/auth/schemas/login-schema"
import { useForm, Controller } from "react-hook-form"
import { useLogin } from "@/modules/auth/hooks/use-login"
import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
    const login = useLogin()

    const [show, setShow] = useState<boolean>(false)

    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            userName: "",
            password: ""
        }
    })

    async function onSubmit(data: LoginSchemaType) {
        try {
            const res = await login.mutateAsync(data)
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

                        <CardTitle className="md:text-3xl text-xl">Entre na sua conta</CardTitle>
                        <CardDescription className="md:text-lg">Bem-Vindo de volta!</CardDescription>
                    </CardHeader>

                    <Separator className="bg-zinc-700" />

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                                        : "Entrar"}
                                </Button>

                                <section className="flex flex-row gap-1 text-lg">
                                    <p>Não tem conta</p>
                                    <Link
                                        type="button"
                                        href={"/screens/register"}
                                        className="underline text-blue-600"
                                        onClick={(e) => {
                                            isSubmitting && e.preventDefault()
                                        }}
                                    >
                                        Cadastre-se
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
