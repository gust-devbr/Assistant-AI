import { Response } from "next-lib-utils";
import { getUserFromToken } from "@/utils/auth";
import { msgService } from "@/services/msgService";
import { sendMessage } from "@/lib/cohere";
import { chatService } from "@/services/chatService";
import { getSearchParams } from "@/utils/searchParams";

export async function GET(req) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const { chatId } = getSearchParams(req);

        const messages = await msgService.getAll(chatId);

        return Response.success({ messages });
    } catch (error) {
        return Response.error("Erro ao buscar mensagens", error);
    }
};

export async function POST(req) {
    try {
        const { message, history, type, chatId } = await req.json();

        const user = await getUserFromToken();

        const reply = await sendMessage(message, type, history);

        if (!user) {
            return Response.success({ reply });
        };

        let currentChatId = chatId;

        if (!currentChatId) {
            const chat = await chatService.create(message.slice(0, 30) || "Novo Chat", user.id);

            if (!newChat?.id) throw new Error("Falha ao criar chat");

            currentChatId = chat.id;
        };

        await msgService.create(currentChatId, message, reply);

        return Response.success({ reply, chatId: currentChatId });

    } catch (error) {
        return Response.error("Erro ao enviar mensagens", error);
    }
};