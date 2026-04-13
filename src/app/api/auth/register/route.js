import { Response } from "next-lib-utils";
import { userService } from "@/services/userService";

export async function POST(req) {
    try {
        const { name, userName, password } = await req.json();

        const existUser = await userService.findByUserName(userName);
        if (existUser) return Response.error("Usuário já cadastrado", null, 409);

        const user = await userService.register(name, userName, password);

        return Response.success({ user }, "Logado com sucesso", 201);
    } catch (error) {
        return Response.error("Erro ao cadastrar", error);
    }
};