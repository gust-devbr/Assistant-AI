import { Response } from "next-lib-utils";
import { chatService } from "@/services/chatService";
import { NextRequest } from "next/server";
import { getToken } from "@/utils/modules/api/auth";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getToken(req);
        if (!user) return Response.error("Não autorizado", null, 401);

        const { id } = await params;
        if (!id) return Response.error("ID não fornecido", null, 400);

        await chatService.delete(id);

        return Response.success(null, "Chat excluído");
    } catch (error) {
        return Response.error("Erro ao excluir chat", error);
    }
};