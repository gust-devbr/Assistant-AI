import { Response } from "next-lib-utils";

export async function POST() {
    const response = Response.success(null, "Logout realizado com sucesso!");

    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
    });

    return response;
};