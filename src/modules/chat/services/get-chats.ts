import { apiFetch } from "next-lib-utils";
import { Chat } from "../types/chat";

export async function getChatsService(): Promise<Chat[]> {
    const res = await apiFetch("/private/chat")
    const chats: Chat[] = res.data.chats
    return chats
}