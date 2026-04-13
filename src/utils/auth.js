import { cookies } from "next/headers";
import { jwtUtil } from "./jwt";

export async function getUserFromToken() {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    try {
        return jwtUtil.verify(token);
    } catch {
        return null;
    }
};