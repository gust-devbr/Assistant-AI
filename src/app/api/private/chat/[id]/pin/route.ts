import { Response } from "@/utils";
import { chatService } from "@/services/chatService";
import { NextRequest } from "next/server";
import { getToken } from "@/utils/modules/api/auth";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getToken(req);
        if (!user) return Response.error("Não autorizado", null, 401);

        const { id } = await params;
        if (!id) return Response.error("ID não fornecido", null, 400);

        const chat = await chatService.update(id);

        return Response.success({ chat });
    } catch (error) {
        return Response.error("Erro ao fixar chat", error);
    }
};