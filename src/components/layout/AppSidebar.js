'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { MoreVertical, Power, Trash } from "lucide-react";
import { ChatModal } from "../modal/ChatModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function AppSidebar() {
    const { logout } = useAuth();
    const router = useRouter();

    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [open, setOpen] = useState(false);

    function openCreateModal() {
        setSelectedChat({ id: null, title: "" });
        setOpen(true);
    };

    async function deleteChat(id) {
        await apiFetch(`/private/chat/${id}`, { method: "DELETE" });
        setTimeout(() => router.replace("/chat"), 800);
    };

    useEffect(() => {
        async function loadChats() {
            try {
                const res = await apiFetch("/private/chat", { method: "GET" });
                setChats(res.data.chats || res.chats);
            } catch (error) {
                console.log(error);
                alert("Erro ao buscar chats");
            }
        };
        loadChats();
    }, []);

    return (
        <Sidebar>
            <SidebarContent className="bg-zinc-900 text-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xl py-7 text-white">Chats</SidebarGroupLabel>

                    <ChatModal
                        open={open}
                        onClick={openCreateModal}
                        onOpenChange={setOpen}
                        chat={selectedChat}
                    />

                    <SidebarMenu>
                        {chats.map(chat => (
                            <SidebarMenuItem key={chat.id} className="flex items-center group">
                                <SidebarMenuButton asChild className="flex-1">
                                    <Button onClick={() => router.push(`/chat/${chat.id}`)}>
                                        <span className="text-lg">{chat.title}</span>
                                    </Button>
                                </SidebarMenuButton>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 opacity-0 group-hover:opacity-100"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="text-red-500" onClick={() => deleteChat(chat.id)}>
                                            <Trash />
                                            Excluir
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="mt-auto">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={logout} className="text-[18px] text-red-600">
                                <Power color="red" className="w-5! h-5!" />
                                Logout
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
};