import { apiFetch } from "next-lib-utils";
import { SelectedChat } from "../types/chat";

export async function CreateUpdateChatService(data: SelectedChat) {
    const { id, title } = data

    const url =
        id !== null
            ? `/private/chat/${id}/edit` : "/private/chat"

    const method =
        id !== null
            ? "PUT" : "POST"

    return await apiFetch(url, {
        method,
        body: JSON.stringify({ title })
    })
}