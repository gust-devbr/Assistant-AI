import { Response } from "next-lib-utils";
import { getUserFromToken } from "@/utils/auth";
import { prisma } from "@/lib/prisma";


export async function GET() {
    try {
        const user = await getUserFromToken();
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