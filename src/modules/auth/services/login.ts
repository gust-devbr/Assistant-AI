import { apiFetch } from "next-lib-utils";
import { LoginSchemaType } from "../schemas/login-schema";
import { ApiResponse } from "@/types/response";

export async function loginService(data: LoginSchemaType): Promise<ApiResponse> {
    return await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data)
    })
}