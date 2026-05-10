"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AuthModal, MsgGroupInput, MsgOptionsPortal } from "@/components/modules";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useUsage } from "@/hooks/useUsage";
import { LimiteAlertScreen } from "@/components/layout/LimiteAlert";
import { LimiteUsageCard } from "@/components/LimitUsageCard";
import { useDeleteMessage } from "@/hooks/modules/home/useDeleteMsg";
import { useChat } from "@/hooks/modules/home/useChat";
import { MarkdownMessage } from "@/utils";

export default function ChatPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { chatId } = useParams();

    const { reached } = useUsage()
    const { handleDeleteMsg } = useDeleteMessage()

    const {
        chat,
        message,
        setMessage,
        type,
        setType,
        loading,
        sendMessage,
    } = useChat(chatId);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);


    if (reached) {
        return (
            <div className="flex justify-center items-center h-full">
                <LimiteAlertScreen />
            </div>
        )
    }

    return (
        <main className="flex flex-col h-screen">
            <header className="p-4 border-b border-gray-800 flex flex-col gap-3 items-center">
                <h1 className="text-2xl md:text-3xl font-semibold">Assistente de Estudos</h1>

                <Separator />

                <div className="flex flex-row justify-between w-full">
                    {!user ? (
                        <div className="w-full max-w-110">
                            <LimiteUsageCard />
                        </div>
                    ) : (
                        <h1 className="text-md md:text-xl font-bold">
                            Olá {user?.name}
                        </h1>
                    )}

                    {user ? (
                        <Button
                            variant="secondary"
                            onClick={() => router.replace("/")}
                            className="bg-primary"
                            disabled={loading}
                        >
                            Voltar
                        </Button>
                    ) : (
                        <AuthModal />
                    )}
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">

                {chat.length === 0 && (
                    <div className="text-center text-gray-500 mt-20 text-xl">
                        {user
                            ? " Crie ou selecione um Chat para começar uma conversa ✨"
                            : "Digite alguma coisa para começar uma conversa ✨"
                        }
                    </div>
                )}

                {chat.map((c, i) => (
                    <div key={i} className={`flex ${c.role === "USER" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={cn(
                                "max-w-[75%] px-4 py-3 rounded-2xl shadow text-gray-200 flex flex-col gap-2",
                                c.role === "USER" ? "bg-primary" : "bg-[#3b4047]"
                            )}
                        >
                            <MarkdownMessage message={c.message} />

                            {user && (
                                <div className="flex justify-end text-sm opacity-70 hover:opacity-100">
                                    <MsgOptionsPortal onDelete={() => handleDeleteMsg(c.id)} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="text-gray-400 text-sm animate-pulse">
                        Assistente está digitando...
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <MsgGroupInput
                loading={loading}
                message={message}
                setMessage={setMessage}
                type={type}
                setType={setType}
                onSubmit={sendMessage}
            />
        </main>
    );
}
