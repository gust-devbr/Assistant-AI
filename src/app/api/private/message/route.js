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

        if (!chatId) return Response.error("Obrigatório selecionar chat", null, 400)

        const user = await getUserFromToken();

        const reply = await sendMessage(message, type, history);

        if (!user) {
            return Response.success({ reply });
        };

        await msgService.create(chatId, message, reply);

        return Response.success({ reply, chatId });

    } catch (error) {
        return Response.error("Erro ao enviar mensagens", error);
    }
};