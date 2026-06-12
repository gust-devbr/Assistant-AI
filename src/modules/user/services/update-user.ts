import { apiFetch } from "next-lib-utils";
import { UpdateUserSchemType } from "../schemas/update-schema";
import { ApiResponse } from "@/types/response";

export async function updateUserService(data: UpdateUserSchemType): Promise<ApiResponse> {
    return await apiFetch("/private/user", {
        method: "PUT",
        body: JSON.stringify(data)
    })
}