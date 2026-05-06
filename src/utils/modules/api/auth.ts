import { jwtUtil, TokenPayload } from "./jwt";
import { NextRequest } from "next/server";

export async function getToken(req: NextRequest): Promise<TokenPayload | null> {
    const authHeader = req.headers.get("authorization")

    const token = authHeader?.split(" ")[1] || null
    if (!token) return null

    try {
        return jwtUtil.verify<TokenPayload>(token)
    } catch {
        return null
    }
}
