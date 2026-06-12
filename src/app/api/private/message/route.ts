import { NextRequest } from "next/server";
import { Response } from "next-lib-utils";
import { getSearchParams } from "@/utils";
import { msgService } from "@/services/msgService";
import { sendMessage } from "@/lib/cohere";
import { getToken } from "@/utils/modules/api/auth";
import { chatService } from "@/services/chatService";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv()

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req);
        if (!user) return Response.error("Não autorizado", null, 401);

        const { chatId } = getSearchParams(req);
        if (!chatId) return Response.error("ID não fornecido", null, 400);

        const messages = await msgService.getAll(chatId);

        return Response.success({ messages });
    } catch (error) {
        return Response.error("Erro ao buscar mensagens", error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await getToken(req);

        const { message, history, type, chatId: rawChatId } = await req.json();

        const deviceId = req.headers.get("x-device-id")

        let key = ""
        let limit = 15

        if (user) {
            key = `free-${user.id}`
            limit = 50
        } else {
            key = `guest-${deviceId}`
        }

        const used = Number(await redis.get(key)) || 0

        if (used >= limit) {
            return Response.error("Você atingiu o limite diário. Volte em 24h", null, 400)
        }

        await redis.incr(key)
        await redis.expire(key, 60 * 60 * 24)

        let chatId = rawChatId;
        let newChat = false;

        if (!chatId && user) {
            const created = await chatService.create(message, user.id);
            chatId = created.id;
            newChat = true;
        }

        const reply = await sendMessage(message, type, history);

        if (typeof reply !== "string") {
            console.error("Resposta inválida do sendMessage:", reply);
            return Response.error("Erro ao gerar resposta", null, 500);
        }

        if (!user) {
            return Response.success({ reply, remaining: limit - (used + 1) });
        }

        await msgService.create(chatId, message, reply);

        return Response.success({ reply, chatId, newChat });

    } catch (error) {
        return Response.error("Erro ao enviar mensagens", error);
    }
}