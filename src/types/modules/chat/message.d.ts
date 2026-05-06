import { Role } from "./roles"

export type MsgTypeProps = 'explicacao' | 'resumo' | 'questao' | 'duvida'

export type MsgProps = {
    id: string
    content?: string
    message: string
    role: Role
    chatId: string
    createdAt: Date
}