/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function ChatModal({ open, onClick, onOpenChange, chat }) {
    const router = useRouter();
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (chat) {
            setTitle(chat.title)
        } else {
            setTitle("")
        }
    }, [chat]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title) {
            alert("Complete o campo");
            return;
        };

        try {
            const res = await apiFetch("/private/chat", {
                method: "POST",
                body: JSON.stringify({ title })
            });

            const chatId = res.data.chat.id;
            router.push(`/chat/${chatId}`);

            onOpenChange(false);
            setTimeout(() => window.location.reload(), 400);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button onClick={onClick} className="text-md border-none rounded-none mb-8">
                    <div className="flex flex-row items-center gap-2">
                        <Plus />
                        <p>Novo Chat</p>
                    </div>
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-900">
                <DialogHeader>
                    <DialogTitle className="text-3xl text-white">
                        Criar
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <Label htmlFor="title" className="text-white text-[18px]">Título</Label>
                    <Input
                        id="title"
                        className="text-white text-[17px]! py-5"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Button onClick={handleSubmit} disabled={!title} className="w-full py-4 text-[18px] mt-5">
                        Salvar
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    )
};  