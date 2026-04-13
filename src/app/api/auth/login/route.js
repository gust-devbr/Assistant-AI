import { Response } from "next-lib-utils";
import { userService } from "@/services/userService";
import bcrypt from "bcryptjs";
import { jwtUtil } from "@/utils/jwt";

export async function POST(req) {
    try {
        const { userName, password } = await req.json();

        const existUser = await userService.findByUserName(userName);
        if (!existUser) return Response.error("Usuário não encontrado", null, 404);

        const match = await bcrypt.compare(password, existUser.password);
        if (!match) return Response.error("Credenciais inválidas", null, 400);

        const safeUser = {
            id: existUser.id,
            name: existUser.name,
            userName: existUser.userName
        };

        const token = jwtUtil.generate(existUser);

        const response = Response.success({ user: safeUser }, "Logado com sucesso");

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });

        return response;
    } catch (error) {
        return Response.error("Erro ao logar", error);
    }
};