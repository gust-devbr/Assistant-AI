import { ApiResponse } from "@/types/response";
import { apiFetch } from "next-lib-utils";

export async function deleteAccountService(password: string): Promise<ApiResponse> {
    return await apiFetch("/private/user", {
        method: "DELETE",
        body: JSON.stringify({ password })
    })
}