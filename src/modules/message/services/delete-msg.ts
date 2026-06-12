import { ApiResponse } from "@/types/response";
import { apiFetch } from "next-lib-utils";

export async function deleteMsgService(id: string | undefined): Promise<ApiResponse> {
    return await apiFetch(`/private/message/${id}/delete`, { method: "DELETE" })
}