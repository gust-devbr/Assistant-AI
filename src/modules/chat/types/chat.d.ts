export type Message = {
    id?: string
    role: string;
    message: string;
}

export type Chat = {
    id: string
    title: string
    fixed: boolean
    userId: string
    createdAt: Date
    messages: Message[]
}

export type SelectedChat = {
    id: string | null
    title: string
}