import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    userName: z.string().min(1, "Usuário obrigatório"),
    password: z.string().min(1, "Senha obrigatória")
})

export type RegisterSchemaType = z.infer<typeof registerSchema>