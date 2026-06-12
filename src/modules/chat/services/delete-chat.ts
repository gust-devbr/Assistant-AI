import { ApiResponse } from "@/types/response";
import { apiFetch } from "next-lib-utils";

export async function deleteAllChatsService(): Promise<ApiResponse> {
    return await apiFetch("/private/chat/delete-all", { method: "DELETE" })
}

export async function deleteChatService(id: string): Promise<ApiResponse> {
    return await apiFetch(`/private/chat/${id}/delete`, { method: "DELETE" })
}