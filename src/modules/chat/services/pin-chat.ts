import { apiFetch } from "next-lib-utils";

export async function pinChatService(id: string) {
    await apiFetch(`/private/chat/${id}/pin`, { method: "PATCH" })
}