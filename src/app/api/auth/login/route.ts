import { NextRequest } from "next/server";
import { jwtUtil, Response } from "@/utils";
import { userService } from "@/services/userService";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { userName, password } = await req.json();

        const existUser = await userService.findByUserName(userName);
        if (!existUser) return Response.error("Usuário não encontrado", null, 404);

        const match = await bcrypt.compare(password, existUser.password);
        if (!match) return Response.error("Credenciais inválidas", null, 400);

        const safeUser = {
            id: existUser.id,
            name: existUser.name,
            userName: existUser.userName,
            createdAt: existUser.createdAt
        };

        const token = jwtUtil.generate(existUser);

        const res = Response.success({ token, user: safeUser }, "Logado com sucesso");
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/"
        })
        return res
    } catch (error) {
        return Response.error("Erro ao logar", error);
    }
};