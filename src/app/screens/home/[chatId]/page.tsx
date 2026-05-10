"use client";

import { useParams } from "next/navigation";
import { HeaderGroup, MessageView, MsgGroupInput } from "@/components/modules";
import { Separator } from "@/components/ui/separator";
import { useChat } from "@/hooks/useMessage";

export default function ChatPage() {
    const { chatId } = useParams();

    const {
        message,
        setMessage,
        chat,
        type,
        setType,
        loading,
        bottomRef,
        sendMessage,
    } = useChat(chatId);

    return (
        <main className="flex flex-col h-screen">
            <header className="p-4 border-b border-gray-800 flex flex-col gap-3 items-center">
                <h1 className="text-2xl md:text-3xl font-semibold">Assistente de Estudos</h1>
                <Separator />
                <HeaderGroup />
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">

                {chat.length === 0 && (
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
