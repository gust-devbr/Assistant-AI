import { Response, getToken } from "@/utils";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req);
        if (!user) return Response.error("Não autorizado", null, 401);

        const findUser = await prisma.user.findFirst({
            where: { id: user.id },
            select: {
                id: true,
                name: true,
                userName: true
            }
        });
        if (!findUser) return Response.error("Usuário não encontrado", null, 404);

        return Response.success({ user: findUser });
    } catch (error) {
        return Response.error("Erro ao buscar dados do usuário", error);
    }
};