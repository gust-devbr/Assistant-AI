'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar, // 👈 importante
    SidebarTrigger
} from "@/components/ui/sidebar"

import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { apiFetch } from "@/utils"
import { Button } from "../ui/button"
import { Cog, MessageCircleMore, MoreVertical, Pin, PinOff, Trash } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Chat, SelectedChat } from "@/types"
import { ChatModal } from "../modules"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"

export function AppSidebar() {
    const router = useRouter()
    const { state } = useSidebar()
    const { chatId } = useParams()

    const collapsed = state === "collapsed"

    const [chats, setChats] = useState<Chat[]>([])
    const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null)
    const [open, setOpen] = useState(false)

    const loadChats = useCallback(async () => {
        const res = await apiFetch("/private/chat", { method: "GET" })
        setChats(res?.data?.chats || res?.chats)
    }, [])

    function openCreateModal() {
        setSelectedChat({ id: null, title: "" })
        setOpen(true)
    }

    async function deleteChat(id: string) {
        await apiFetch(`/private/chat/${id}/delete`, { method: "DELETE" })
        await loadChats()
        router.replace("/")
    }

    async function fixedChat(id: string) {
        await apiFetch(`/private/chat/${id}/pin`, { method: "PATCH" })
        await loadChats()
    }

    useEffect(() => {
        loadChats()
    }, [loadChats, chatId])

    return (
        <Sidebar collapsible="icon">

            {collapsed && <Separator />}

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="py-6 flex items-center gap-2">
                        <MessageCircleMore className="w-7! h-7! text-primary" />
                        <span className="text-xl">Assistant AI</span>
                    </SidebarGroupLabel>

                    <ChatModal
                        open={open}
                        onClick={openCreateModal}
                        onOpenChange={setOpen}
                        chat={selectedChat}
                        collapsed={collapsed}
                        onReload={loadChats}
                    />

                    <Separator />

                    <SidebarMenu className="relative">
                        {chats.map(chat => (
                            <SidebarMenuItem
                                title={chat.title}
                                key={chat.id}
                                className="group flex items-center py-1"
                            >
                                <SidebarMenuButton asChild>
                                    <Button
                                        onClick={() => router.push(`/screens/home/${chat.id}`)}
                                        className={cn(
                                            "flex flex-1 items-center gap-2 w-full",
                                            "rounded-md px-2 py-1 transition-colors text-white justify-start",
                                            chatId === chat.id
                                                ? "bg-primary hover:bg-primary/80"
                                                : "hover:bg-zinc-800/50 bg-zinc-400"
                                        )}
                                    >
                                        <MessageCircleMore className="w-5! h-5! shrink-0" />

                                        {!collapsed && (
                                            <span className="truncate text-sm md:text-lg">
                                                {chat.title}
                                            </span>
                                        )}
                                    </Button>
                                </SidebarMenuButton>

                                {!collapsed && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={cn(
                                                    "h-7 w-7 md:opacity-0 group-hover:opacity-100",
                                                    "absolute right-2 top-1/2 -translate-y-1/2",
                                                )}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                className="text-red-500"
                                                onClick={() => deleteChat(chat.id)}
                                            >
                                                <Trash />
                                                Excluir
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() => fixedChat(chat.id)}
                                            >
                                                {chat.fixed ? <PinOff /> : <Pin />}
                                                {chat.fixed ? "Desfixar" : "Fixar"}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </SidebarMenuItem>
                        ))}
                        <Separator />
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="mt-auto">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => router.push("/screens/settings")}
                                className="flex items-center gap-2 text-lg"
                            >
                                <Cog className="w-5! h-5!" />
                                {!collapsed && <span>Configurações</span>}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}
