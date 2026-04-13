/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { MarkdownMessage } from "@/utils/markdown";
import { apiFetch } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/modal/AuthModal";

export default function ChatPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { chatId } = useParams();

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [type, setType] = useState("explicacao");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    useEffect(() => {
        if (!chatId || chatId === "new") {
            setChat([]);
            return;
        };

        async function loadMessages() {
            try {
                if (!chatId) return;

                const res = await apiFetch(`/private/message?chatId=${chatId}`, { method: "GET" });

                const formatted = res.data.messages.map((m) => ({
                    role: m.role === "user" ? "USER" : "ASSISTANT",
                    message: m.content,
                }));

                setChat(formatted);
            } catch (error) {
                console.log(error);
            }
        };

        loadMessages();
    }, []);

    async function sendMessage() {
        if (!message) return;

        if (!chatId) {
            alert("Selecione ou crie um Chat antes de enviar mensagem");
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

        setChat(prev => [...prev, { role: "ASSISTANT", message: res.data.reply }]);
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-screen bg-linear-to-b from-[#0b0e14] to-[#111827] text-white">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h1 className="text-xl font-semibold">Assistente de Estudos</h1>
                <h1 className="text-xl font-semibold">
                    {user ? `Olá ${user.name}` : "Olá Anônimo"}
                </h1>

                {user ? (
                    <Button variant="outline" className="text-black" onClick={() => router.replace("/")}>
                        Voltar
                    </Button>
                ) : (
                    <AuthModal />
                )}
            </div>

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
                            className={`
                            max-w-[75%] px-4 py-3 rounded-2xl shadow
                            ${c.role === "USER"
                                    ? "bg-indigo-600 text-white rounded-br-none"
                                    : "bg-[#1f2937] text-gray-200 rounded-bl-none"}
                            `}
                        >
                            <MarkdownMessage message={c.message} />
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

            <div className="p-4 border-t border-gray-800 flex gap-3 items-center">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="bg-[#0d1117] border border-gray-700 rounded-md px-3 py-4 text-md"
                >
                    <option value="explicacao">Explicação</option>
                    <option value="resumo">Resumo</option>
                    <option value="questao">Questões</option>
                </select>

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 "
                />

                <button
                    onClick={sendMessage}
                    disabled={!message}
                    className={`bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-medium transition active:scale-95  ${!message ? " opacity-50 cursor-not-allowed" : ""}`}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}