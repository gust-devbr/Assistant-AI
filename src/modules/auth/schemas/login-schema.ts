import { z } from "zod"

export const loginSchema = z.object({
    userName: z.string().min(1, "Usuário obrigatório")
        .transform((value) => value.toLowerCase()),
    password: z.string().min(1, "Senha obrigatória")
})

export type LoginSchemaType = z.infer<typeof loginSchema>