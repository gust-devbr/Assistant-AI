import { Response } from "next-lib-utils";
import { getUserFromToken } from "@/utils/auth";
import { chatService } from "@/services/chatService";

export async function GET() {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const chats = await chatService.findAll(user.id);

        return Response.success({ chats });
    } catch (error) {
        return Response.error("Erro ao buscar chats", error);
    }
};

export async function POST(req) {
    try {
        const { title } = await req.json();

        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const chat = await chatService.create(title, user.id);

        return Response.success({ chat });
    } catch (error) {
        return Response.error("Erro ao criar chat", error);
    }
};