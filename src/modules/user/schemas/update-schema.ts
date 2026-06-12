import { z } from "zod"
import { optionalField } from "next-lib-utils"

export const updateUserSchema = z.object({
    name: optionalField(z.string()),
    userName: optionalField(z.string()),
    password: optionalField(z.string()),
    newPassword: optionalField(z.string()),
})

export type UpdateUserSchemType = z.infer<typeof updateUserSchema>