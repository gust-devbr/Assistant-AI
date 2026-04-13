export function getSearchParams(req) {
    const url = new URL(req.url);

    const userId = url.searchParams.get("userId");
    const chatId = url.searchParams.get("chatId");

    return { userId, chatId }
};