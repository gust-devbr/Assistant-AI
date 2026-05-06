import { NextRequest } from "next/server";
import { Response, getSearchParams, getToken } from "@/utils";
import { msgService } from "@/services/msgService";
import { sendMessage } from "@/lib/cohere";
import { chatService } from "@/services/chatService";

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req);
        if (!user) return Response.error("Não autorizado", null, 401);

        const { chatId } = getSearchParams(req);
        if (!chatId) return Response.error("ID não fornecido", null, 400)

        const messages = await msgService.getAll(chatId);

        return Response.success({ messages });
    } catch (error) {
        return Response.error("Erro ao buscar mensagens", error);
    }
};

export async function POST(req: NextRequest) {
    try {
        const { message, history, type, chatId } = await req.json();

        if (!chatId) return Response.error("Obrigatório selecionar chat", null, 400)

        const user = await getToken(req);

        const reply = await sendMessage(message, type, history);

        if (typeof reply !== "string") {
            console.error("Resposta inválida do sendMessage:", reply);
            return Response.error("Erro ao gerar resposta", null, 500);
        }

        if (!user) {
            return Response.success({ reply });
        };

        await msgService.create(chatId, message, reply);

        return Response.success({ reply, chatId });

    } catch (error) {
        return Response.error("Erro ao enviar mensagens", error);
    }
};