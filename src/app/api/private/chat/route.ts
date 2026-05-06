import { Response } from "@/utils";
import { chatService } from "@/services/chatService";
import { NextRequest } from "next/server";
import { getToken } from "@/utils/modules/api/auth";

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req);
        if (!user) return Response.error("Não autorizado", null, 401);

        const chats = await chatService.findAll(user.id);

        return Response.success({ chats });
    } catch (error) {
        return Response.error("Erro ao buscar chats", error);
    }
};

export async function POST(req: NextRequest) {
    try {
        const { title } = await req.json();

        const user = await getToken(req);
        if (!user) return Response.error("Não autorizado", null, 401);

        const chat = await chatService.create(title, user.id);

        return Response.success({ chat });
    } catch (error) {
        return Response.error("Erro ao criar chat", error);
    }
};