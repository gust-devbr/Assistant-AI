import { NextRequest } from "next/server";
import { Response } from "next-lib-utils";
import { userService } from "@/services/userService";
import bcrypt from "bcryptjs";
import { getToken } from "@/utils/modules/api/auth";

export async function PUT(req: NextRequest) {
    try {
        const { name, userName, password, newPassword } = await req.json()

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        if (password && newPassword) {
            if (password === newPassword) return Response.error("Nova senha não pode ser igual a atual", null, 400)

            const findUser = await userService.findById(user.id)
            if (!findUser) return

            const valid = await bcrypt.compare(password, findUser.password)
            if (!valid) return Response.error("Senha atual incorreta", null, 400)
        }

        await userService.update(user.id, name, userName, newPassword)

        return Response.success(null, "Dados atualizados")
    } catch (error) {
        return Response.error("Erro ao atualizar dados", error)
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { password } = await req.json()

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const findUser = await userService.findById(user.id)
        if (!findUser) return

        const valid = await bcrypt.compare(password, findUser.password)
        if (!valid) return Response.error("Senha inconrreta", null, 400)

        await userService.delete(user.id)

        return Response.success(null, "Conta excluída com sucesso")
    } catch (error) {
        return Response.error("Erro ao deletear conta", error)
    }
}
