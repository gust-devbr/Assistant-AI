'use client'

import { useParams, usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Cog, MessageCircleMore, MoreVertical, Pencil, Pin, PinOff, Trash } from "lucide-react"
import { LimiteUsageCard } from "../LimitUsageCard"
import { ChatModal } from "../modules"
import { cn } from "@/lib/utils"

import { Chat, SelectedChat } from "@/types"

import { useChats } from "@/modules/chat/hooks/use-chats"
import { useDeleteChat } from "@/modules/chat/hooks/use-delete"
import { usePinChat } from "@/modules/chat/hooks/use-pin-chat"

export function AppSidebar() {
    const router = useRouter()
    const pathname = usePathname()
    const { state } = useSidebar()
    const { chatId } = useParams()

    const { data: chats } = useChats()
    const deleteChat = useDeleteChat()
    const pinChat = usePinChat()

    const collapsed = state === "collapsed"

    const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null)
    const [open, setOpen] = useState(false)

    function openCreateModal() {
        setSelectedChat({ id: null, title: "" })
        setOpen(true)
    }

    function openEditModal(chat: Chat) {
        setSelectedChat({
            id: chat.id,
            title: chat.title
        })
        setOpen(true)
    }

    async function handleDeleteChat(id: string) {
        await deleteChat.mutateAsync({ id })

        if (pathname === `/screens/home/${id}`) {
            router.replace("/screens/home/null")
        }
    }

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
                    />

                    <Separator />

                    {!collapsed && (
                        <LimiteUsageCard />
                    )}

                    <Separator />

                    <SidebarMenu className="relative">
                        {chats?.map(chat => (
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
                                                onClick={() => handleDeleteChat(chat.id)}
                                            >
                                                <Trash />
                                                Excluir
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                className="text-blue-500"
                                                onClick={() => openEditModal(chat)}
                                            >
                                                <Pencil />
                                                Editar
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() => pinChat.mutateAsync({ id: chat.id })}
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
