import { NextRequest } from "next/server";

export function getSearchParams(req: NextRequest) {
    const url = new URL(req.url);

    const userId = url.searchParams.get("userId");
    const chatId = url.searchParams.get("chatId");

    return { userId, chatId }
};