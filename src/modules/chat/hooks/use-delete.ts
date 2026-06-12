import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    deleteAllChatsService,
    deleteChatService,
} from "../services/delete-chat";

export function useDeleteAllChats() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () =>
            await deleteAllChatsService(),

        onSuccess: () => {
            queryClient.setQueryData(["chats"], null)
        }
    })
}

export function useDeleteChat() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id }: { id: string }) =>
            await deleteChatService(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['chats']
            })
        }
    })
}