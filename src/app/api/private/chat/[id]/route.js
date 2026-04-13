import { Response } from "next-lib-utils";
import { getUserFromToken } from "@/utils/auth";
import { chatService } from "@/services/chatService";

export async function PUT(req, { params }) {
    try {
        const { title } = await req.json();

        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const { id } = await params;
        if (!id) return Response.error("ID não fornecido", null, 400);

        const chat = await chatService.rename(title, id);

        return Response.success({ chat });
    } catch (error) {
        return Response.error("Erro ao editar chat", error);
    }
};

export async function PATCH(req, { params }) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const { id } = await params;
        if (!id) return Response.error("ID não fornecido", null, 400);

        const chat = await chatService.update(id);

        return Response.success({ chat });
    } catch (error) {
        return Response.error("Erro ao fixar chat", error);
    }
};

export async function DELETE(req, { params }) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const { id } = await params;
        if (!id) return Response.error("ID não fornecido", null, 400);

        await chatService.delete(id);

        return Response.success(null, "Chat excluído");
    } catch (error) {
        return Response.error("Erro ao excluir chat", error);
    }
};