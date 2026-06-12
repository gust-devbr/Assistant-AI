/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { Message } from "@/modules/chat/types/chat";
import { useGetMessages } from "@/modules/message/hooks/use-messages";
import { useSendMessage } from "@/modules/message/hooks/use-send-msg";
import { MsgTypeProps } from "@/modules/message/types/message";
import { ParamValue } from "next/dist/server/request/params";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function useMessage(chatId?: ParamValue) {
    const router = useRouter();

    const [message, setMessage] = useState("");
    const [type, setType] = useState<MsgTypeProps>(
        "explicacao"
    );

    const bottomRef = useRef<HTMLDivElement | null>(null);
    const initialized = useRef(false);

    const {
        data: messages = [],
        isLoading,
    } = useGetMessages({ chatId });

    const sendMutation = useSendMessage();

    const [localChat, setLocalChat] = useState<Message[]>([]);

    useEffect(() => {
        if (!initialized.current) {
            setLocalChat(messages);
            initialized.current = true;
        }
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [localChat]);

    async function sendMessage() {
        if (!message.trim()) return;

        const userMessage: Message = {
            role: "USER",
            message,
        };

        const optimisticChat = [...localChat, userMessage];

        setLocalChat(optimisticChat);
        setMessage("");

        try {
            const res = await sendMutation.mutateAsync({
                message,
                history: optimisticChat,
                type,
                chatId: chatId === "null" ? undefined : chatId,
            });

            if (res?.newChat && res?.chatId) {
                router.replace(`/screens/home/${res.chatId}`);
            }

            setLocalChat(prev => [
                ...prev,
                {
                    role: "ASSISTANT",
                    message: res?.reply || "Erro ao gerar resposta",
                },
            ]);
        } catch {
            setLocalChat(prev => [
                ...prev,
                {
                    role: "ASSISTANT",
                    message: "Erro ao gerar resposta",
                },
            ]);
        }
    }
    return {
        message,
        setMessage,
        chat: localChat,
        type,
        setType,
        loading: isLoading || sendMutation.isPending,
        bottomRef,
        sendMessage,
    };
}