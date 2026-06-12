"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

type Props = {
    open: boolean
    onClick: () => void
    onOpenChange: (value: boolean) => void
    chat: SelectedChat | null
    collapsed: boolean
}

import { useCreateUpdateChat } from "@/modules/chat/hooks/use-create-update"
import { SelectedChat } from "@/modules/chat/types/chat";
import { useForm } from "react-hook-form"
import { Spinner } from "@/components/ui/spinner";

export function ChatModal({
    open,
    onClick,
    onOpenChange,
    chat,
    collapsed,
}: Props) {
    const router = useRouter();
    const chatService = useCreateUpdateChat()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, isSubmitting }
    } = useForm<SelectedChat>({
        defaultValues: {
            id: "",
            title: ""
        }
    })

    useEffect(() => {
        if (chat?.id !== null) {
            reset({
                id: chat?.id,
                title: chat?.title
            })
        } else {
            reset({
                id: null,
                title: ""
            })
        }
    }, [chat, reset]);

    async function onSubmit(data: SelectedChat) {
        try {
            if (!data.title) {
                alert("Complete o campo");
                return;
            };

            const res = await chatService.mutateAsync(data)

            const { id: chatId } = res?.data?.chat;
            router.push(`/screens/home/${chatId}`);

            onOpenChange(false);
        } catch (error: unknown) {
            console.log(error);
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            {...register("title")}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting || !isDirty}
                            className="w-full py-4 text-[18px] mt-5"
                        >
                            {isSubmitting
                                ? <Spinner className="w-5! h-5!" />
                                : "Salvar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
