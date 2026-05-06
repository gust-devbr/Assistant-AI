/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch, MarkdownMessage } from "@/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AuthModal, MsgOptionsPortal } from "@/components/modules";
import { Separator } from "@/components/ui/separator";
import { InfoButton } from "@/components/modules";
import { Message, MsgProps, MsgTypeProps, } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ChatPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { chatId } = useParams();

    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<Message[]>([]);
    const [type, setType] = useState<MsgTypeProps>("explicacao");
    const [loading, setLoading] = useState<boolean>(false);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    useEffect(() => {
        if (!chatId || chatId === "null") {
            setChat([]);
            return;
        };

        async function loadMessages() {
            try {
                if (!chatId) return;

                const res = await apiFetch(`/private/message?chatId=${chatId}`, { method: "GET" });

                const dataMsg = res?.data?.messages || [];

                const formatted: Message[] = dataMsg.map((m: MsgProps) => ({
                    id: m.id,
                    role: (m.role === "user" ? "USER" : "ASSISTANT") as "USER" | "ASSISTANT",
                    message: m.content
                }));

                setChat(formatted);
            } catch (error) {
                console.log(error);
            }
        };

        loadMessages();
    }, [chatId]);

    async function sendMessage() {
        if (!message) return;

        if (user && chatId === "null") {
            toast.error("Selecione ou crie um Chat antes de enviar mensagem");
            return;
        };

        const newChat = [...chat, { role: "USER", message }];
        setChat(newChat);
        setMessage("");
        setLoading(true);

        const res = await apiFetch("/private/message", {
            method: "POST",
            body: JSON.stringify({
                message,
                history: newChat,
                type,
                chatId
            }),
        });

        const reply = res?.data?.reply

        setChat(prev => [...prev, { role: "ASSISTANT", message: reply || "Erro ao gerar resposta" }]);
        setLoading(false);
    };

    async function handleDeleteMsg(id: string | undefined) {
        await apiFetch(`/private/message/${id}/delete`, { method: "DELETE" })
        setTimeout(() => window.location.reload(), 800)
    }

    return (
        <main className="flex flex-col h-screen">
            <header className="p-4 border-b border-gray-800 flex flex-col gap-3 items-center">
                <h1 className="text-2xl md:text-3xl font-semibold">Assistente de Estudos</h1>

                <Separator />

                <div className="flex flex-row justify-between w-full">
                    <h1 className="text-md md:text-xl font-semibold">
                        {user ? `Olá ${user.name}` : "Olá Anônimo"}
                    </h1>

                    {user ? (
                        <Button variant="outline" onClick={() => router.replace("/")}>
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
                                c.role === "USER" ? "bg-[#2e5a98]" : "bg-[#3b4047]"
                            )}
                        >
                            <MarkdownMessage message={c.message} />

                            <div className="flex justify-end text-sm opacity-70 hover:opacity-100">
                                <MsgOptionsPortal onDelete={() => handleDeleteMsg(c.id)} />
                            </div>
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

            <div className="p-4 border-t flex flex-col md:flex-row gap-3 items-center">
                <div className="flex flex-row items-center gap-3 w-full md:w-40">
                    <InfoButton />

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as MsgTypeProps)}
                        className="border md:w-30 w-full rounded-md px-3 py-4 text-md"
                    >
                        <option value="explicacao">Explicação</option>
                        <option value="resumo">Resumo</option>
                        <option value="questao">Questões</option>
                        <option value="duvida">Dúvida</option>
                    </select>
                </div>

                <div className="flex flex-1 gap-2 w-full flex-row">
                    <input
                        disabled={loading}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 border rounded-lg px-4 py-3 focus:outline-none"
                    />

                    <button
                        onClick={sendMessage}
                        disabled={!message || loading}
                        className={`px-6 py-3 border rounded-lg font-medium transition active:scale-95 ${!message && "opacity-50 cursor-not-allowed"}`}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </main>
    );
}
