"use client";

import { useParams } from "next/navigation";

import { HeaderGroup, MessageView, MsgGroupInput } from "@/components/modules";
import { LimiteAlertScreen } from "@/components/layout/LimiteAlert";
import { Separator } from "@/components/ui/separator";

import { useUsage } from "@/modules/usage/hooks/use-usage";
import { useMessage } from "@/hooks/useMessage";

export default function ChatPage() {
    const { chatId } = useParams();
    const { reached } = useUsage()

    const {
        chat,
        message,
        setMessage,
        type,
        setType,
        loading,
        sendMessage,
        bottomRef
    } = useMessage(chatId);

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
                <HeaderGroup />
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">

                {(!loading && chat.length === 0) && (
                    <div className="text-center text-gray-500 mt-20 text-xl">
                        Digite alguma coisa para começar uma conversa ✨
                    </div>
                )}

                {chat.map((chat) => <MessageView chat={chat} key={chat.id} />)}

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
