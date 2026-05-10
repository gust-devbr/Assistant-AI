import { useChat } from "@/hooks/useMessage";
import { MsgOptionsPortal } from "../portal/MsgOptions";
import { MarkdownMessage } from "@/utils";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { useAuth } from "@/context/AuthContext";

export function MessageView({ chat }: { chat: Message }) {
    const { handleDeleteMsg } = useChat()
    const { user } = useAuth()

    return (
        <div key={chat.id} className={`flex ${chat.role === "USER" ? "justify-end" : "justify-start"}`}>
            <div
                className={cn(
                    "max-w-[75%] px-4 py-3 rounded-2xl shadow text-gray-200 flex flex-col gap-2",
                    chat.role === "USER" ? "bg-primary" : "bg-[#3b4047]"
                )}
            >
                <MarkdownMessage message={chat.message} />

                {user && (
                    <div className="flex justify-end text-sm opacity-70 hover:opacity-100">
                        <MsgOptionsPortal onDelete={() => handleDeleteMsg(chat.id)} />
                    </div>
                )}
            </div>
        </div>
    )
}