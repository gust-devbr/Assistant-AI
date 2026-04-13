"use client"

import { useEffect, useState, createContext, useContext } from "react";
import { apiFetch } from "@/utils/api";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadUser() {
            try {
                setLoading(true);
                const res = await apiFetch("/private/me", { method: "GET" });
                setUser(res.data.user)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    async function login(userName, password) {
        try {
            const data = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ userName, password })
            });

            return data;
        } catch (error) {
            console.log(error);
        }
    };

    async function register(name, userName, password) {
        try {
            const data = await apiFetch("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, userName, password })
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    async function logout() {
        await apiFetch("/private/logout", { method: "POST" });
        setUser(null);
        setTimeout(() => router.replace(`/chat/${null}`), 500)
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth fora do provider");
    return context;
};