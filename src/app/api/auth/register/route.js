import { Response } from "next-lib-utils";
import { userService } from "@/services/userService";
import { jwtUtil } from "@/utils/jwt";

export async function POST(req) {
    try {
        const { name, userName, password } = await req.json();

        const existUser = await userService.findByUserName(userName);
        if (existUser) return Response.error("Usuário já cadastrado", null, 409);

        const user = await userService.register(name, userName, password);

        const token = jwtUtil.generate(user);

        const response = Response.success({ user }, "Cadastrado com sucesso", 201);

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });

        return response;
    } catch (error) {
        return Response.error("Erro ao cadastrar", error);
    }
};