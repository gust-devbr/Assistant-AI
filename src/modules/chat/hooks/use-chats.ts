import { useQuery } from "@tanstack/react-query";
import { getChatsService } from "../services/get-chats";

export function useChats() {
    return useQuery({
        queryKey: ['chats'],
        queryFn: async () => await getChatsService(),
    })
}