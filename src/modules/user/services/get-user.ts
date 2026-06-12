import { apiFetch } from "next-lib-utils"
import { User } from "../types/user"

export async function getUserService(): Promise<User> {
    const res = await apiFetch("/private/me")
    const user: User = res.data.user
    return user
}