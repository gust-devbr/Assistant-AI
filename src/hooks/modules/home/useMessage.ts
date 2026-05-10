"use client"
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils";
import { Message, MsgProps, MsgTypeProps } from "@/types";
import { ParamValue } from "next/dist/server/request/params";

export function useMessage(chatId?: ParamValue) {
    const router = useRouter();

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
        }

        // eslint-disable-next-line react-hooks/immutability
        loadMessages();
    }, [chatId]);

    async function loadMessages() {
        try {
            if (!chatId) return;

            const res = await apiFetch(`/private/message?chatId=${chatId}`, { method: "GET" });

            const dataMsg = res?.data?.messages || [];

            const formatted: Message[] = dataMsg.map((m: MsgProps) => ({
                id: m.id,
                role: (m.role === "user" ? "USER" : "ASSISTANT") as "USER" | "ASSISTANT",
                message: m.content,
            }));

            setChat(formatted);
        } catch (error) {
            console.log(error);
        }
    }

    async function sendMessage() {
        if (!message) return;

        const newChat = [...chat, { role: "USER", message }];
        setChat(newChat as Message[]);
        setMessage("");
        setLoading(true);

        const res = await apiFetch("/private/message", {
            method: "POST",
            body: JSON.stringify({
                message,
                history: newChat,
                type,
                chatId: chatId === "null" ? undefined : chatId,
            }),
        });

        if (res?.data?.newChat && res?.data?.chatId) {
            router.replace(`/screens/home/${res.data.chatId}`);
        }

        const reply = res?.data?.reply;
        setChat(prev => [...prev, { role: "ASSISTANT", message: reply || "Erro ao gerar resposta" }]);
        setLoading(false);
    }

    async function handleDeleteMsg(id: string | undefined) {
        await apiFetch(`/private/message/${id}/delete`, { method: "DELETE" });
        setTimeout(() => window.location.reload(), 800);
    }

    return {
        message,
        setMessage,
        chat,
        type,
        setType,
        loading,
        bottomRef,
        sendMessage,
        handleDeleteMsg,
    };
}
