/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { SelectedChat } from "@/types";

type Props = {
    open: boolean
    onClick: () => void
    onOpenChange: (value: boolean) => void
    chat: SelectedChat | null
    collapsed: boolean
    onReload: () => void
}

export function ChatModal({
    open,
    onClick,
    onOpenChange,
    chat,
    collapsed,
    onReload
}: Props) {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (chat) {
            setTitle(chat.title)
        } else {
            setTitle("")
        }
    }, [chat]);

    async function handleSubmit() {
        setLoading(true)

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
            router.push(`/screens/home/${chatId}`);

            onOpenChange(false);
            onReload()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button onClick={onClick} className="text-md border-none rounded-lg mb-8" title="Novo chat">
                    <div className="flex flex-row items-center gap-2">
                        <Plus className="h-6! w-6!" />
                        {!collapsed && <p>Novo Chat</p>}
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

                    <Button
                        onClick={handleSubmit}
                        disabled={!title || loading}
                        className="w-full py-4 text-[18px] mt-5"
                    >
                        Salvar
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    )
};  