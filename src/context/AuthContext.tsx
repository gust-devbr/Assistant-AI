/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState, createContext, useCallback, useContext, ReactNode } from "react"
import { apiFetch } from "@/utils"
import { AuthContextType, User } from "@/types"
import { useRouter } from "next/navigation"

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter()

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchUser = useCallback(async () => {
        setLoading(true)
        try {
            const res = await apiFetch("/private/me")

            if (res.ok) {
                const { user } = res?.data || res?.data?.data
                setUser(user)
            } else {
                setUser(null)
            }
        } catch (error: unknown) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    async function login(userName: string, password: string) {
        try {
            return await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ userName, password })
            })
        } catch (error: unknown) {
            console.error(error)
        }
    }

    async function register(name: string, userName: string, password: string) {
        try {
            return await apiFetch("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, userName, password })
            })
        } catch (error: unknown) {
            console.error(error)
        }
    }

    async function logout() {
        localStorage.removeItem("accent-theme");
        document.documentElement.setAttribute("data-accent", "gray");

        await apiFetch("/auth/logout", { method: "POST" })
        setUser(null)
        router.replace("/")
    }

    return (
        <AuthContext.Provider value={{ user, loading, fetchUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth fora do provider")
    return context
}
