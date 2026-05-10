/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/utils";
import { useUsage } from "@/hooks/useUsage";
import { getDeviceId } from "@/lib/secury/getDeviceId";
import { toast } from "sonner";
import { Message, MsgProps, MsgTypeProps } from "@/types";
import { ParamValue } from "next/dist/server/request/params";

export function useChat(chatId: ParamValue) {
    const router = useRouter();
    const { refetch } = useUsage();

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

        async function loadMessages() {
            try {
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

        loadMessages();
    }, [chatId]);

    async function sendMessage() {
        if (!message) return;

        try {
            const newChat = [...chat, { role: "USER", message }];
            setChat(newChat);
            setMessage("");
            setLoading(true);

            const res = await apiFetch("/private/message", {
                method: "POST",
                headers: { "x-device-id": getDeviceId() },
                body: JSON.stringify({
                    message,
                    history: newChat,
                    type,
                    chatId: chatId === "null" ? undefined : chatId,
                }),
            });

            if (!res?.ok) {
                toast.error(res?.message);
            }

            if (res?.data?.newChat && res?.data?.chatId) {
                router.replace(`/screens/home/${res.data.chatId}`);
            }

            const reply = res?.data?.reply;
            setChat((prev) => [
                ...prev,
                { role: "ASSISTANT", message: reply || "Erro ao gerar resposta" },
            ]);
        } finally {
            await refetch();
            setLoading(false);
        }
    }

    return {
        chat,
        message,
        setMessage,
        type,
        setType,
        loading,
        bottomRef,
        sendMessage,
    };
}