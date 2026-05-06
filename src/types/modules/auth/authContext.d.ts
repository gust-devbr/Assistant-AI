import { User } from "./user";

type AuthData = {
    token?: string
    user?: User
}

type Response<T> = {
    success: boolean
    ok?: boolean
    message: string
    data: T
}

export type AuthContextType = {
    user: User | null
    loading: boolean
    fetchUser: () => Promise<void>
    login: (userName: string, password: string) => Promise<Response<AuthData>>
    register: (name: string, userName: string, password: string) => Promise<Response<AuthData>>
    logout: () => Promise<void>
}