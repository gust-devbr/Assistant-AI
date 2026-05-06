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

        const res = Response.success({ token, user: safeUser }, "Cadastrado com sucesso", 201);
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/"
        })
        return res
    } catch (error) {
        return Response.error("Erro ao cadastrar", error);
    }
};