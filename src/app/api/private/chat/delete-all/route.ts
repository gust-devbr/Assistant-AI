import { NextRequest } from "next/server";
import { Response } from "next-lib-utils";
import { chatService } from "@/services/chatService";
import { getToken } from "@/utils/modules/api/auth";

export async function DELETE(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        await chatService.deleteAll(user.id)

        return Response.success(null, "Chats deletados com sucesso")
    } catch (error) {
        return Response.error("Erro ao deletar todos os chats", error)
    }
}