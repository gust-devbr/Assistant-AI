import { apiFetch } from "next-lib-utils";

export async function logoutService(): Promise<void> {
    await apiFetch("/auth/logout", { method: "POST" })
}