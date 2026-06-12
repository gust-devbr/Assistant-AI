import { Message } from "@/modules/chat/types/chat";
import { apiFetch } from "next-lib-utils";
import { MsgProps } from "../types/message";
import { ParamValue } from "next/dist/server/request/params";

export async function getMessageService(chatId: ParamValue | undefined): Promise<Message[]> {
    const res = await apiFetch(`/private/message?chatId=${chatId}`, { method: "GET" });

    const dataMsg = res.data.messages || []

    const formatted: Message[] = dataMsg.map((m: MsgProps) => ({
        id: m.id,
        role: (m.role === "user" ? "USER" : "ASSISTANT") as "USER" | "ASSISTANT",
        message: m.content,
    }))

    return formatted
}