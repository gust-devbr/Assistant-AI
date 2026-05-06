import { NextRequest } from "next/server";
import { jwtUtil, Response } from "@/utils";
import { userService } from "@/services/userService";

export async function POST(req: NextRequest) {
    try {
        const { name, userName, password } = await req.json();

        const existUser = await userService.findByUserName(userName);
        if (existUser) return Response.error("Usuário já cadastrado", null, 409);

        const user = await userService.register(name, userName, password);

        const safeUser = {
            id: user.id,
            name: user.name,
            userName: user.userName
        };

        const token = jwtUtil.generate(user);

        return Response.success({ token, user: safeUser }, "Cadastrado com sucesso", 201);
    } catch (error) {
        return Response.error("Erro ao cadastrar", error);
    }
};