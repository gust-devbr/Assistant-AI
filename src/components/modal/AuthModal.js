"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export function AuthModal() {
    const { login, register } = useAuth();

    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        userName: "",
        password: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const { name, userName, password } = form;

        if (!userName || !password) {
            alert("Complete os campos");
            return;
        };

        try {
            setLoading(true);

            const data = isLogin
                ? await login(userName, password)
                : await register(name, userName, password);

            if (data.success === true) {
                setOpen(false)
            };

            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = loading || !form.userName || !form.password;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-md" onClick={() => setIsLogin(true)}>
                    Login
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-900">
                <DialogHeader>
                    <DialogTitle className="text-3xl text-white">
                        {isLogin ? "Login" : "Cadastro"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    {!isLogin && (
                        <>
                            <Label htmlFor="name" className="text-white text-[18px]">Nome</Label>
                            <Input
                                id="name"
                                className="text-white text-[17px]! py-5"
                                value={form.name}
                                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </>
                    )}
                    <Label htmlFor="userName" className="text-white text-[18px]">Usuário</Label>
                    <Input
                        id="userName"
                        className="text-white text-[17px]! py-5"
                        value={form.userName}
                        onChange={(e) => setForm(prev => ({ ...prev, userName: e.target.value }))}
                    />
                    <Label htmlFor="password" className="text-white text-[18px]">Senha</Label>
                    <Input
                        id="password"
                        className="text-white text-[17px]! py-5"
                        value={form.password}
                        onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                    />

                    <Button variant="outline" onClick={handleSubmit} disabled={isDisabled} className="w-full py-4 text-[18px] mt-5">
                        {loading ? <Spinner /> : (isLogin ? "Entrar" : "Cadastrar")}
                    </Button>

                    <p>
                        <button className="text-[18px] mt-2 hover:underline text-zinc-300" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Criar conta" : "Entrar na conta"}
                        </button>
                    </p>
                </div>
            </DialogContent>
        </Dialog >
    )
};  