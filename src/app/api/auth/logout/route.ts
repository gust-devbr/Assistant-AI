import { Response } from "next-lib-utils";

export async function POST() {
    const res = Response.success(null, "Logout sucesso")
    res.cookies.set("token", "", { maxAge: 0, path: "/" })
    return res
}