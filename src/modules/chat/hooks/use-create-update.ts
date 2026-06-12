import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateUpdateChatService } from "../services/create-update";
import type { SelectedChat } from "../types/chat";

export function useCreateUpdateChat() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: SelectedChat) =>
            await CreateUpdateChatService(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['chats']
            })
        }
    })
}