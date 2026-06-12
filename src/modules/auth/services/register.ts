import { apiFetch } from "next-lib-utils";
import { RegisterSchemaType } from "../schemas/register-schema";
import { ApiResponse } from "@/types/response";

export async function registerService(data: RegisterSchemaType): Promise<ApiResponse> {
    return await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(data)
    })
}