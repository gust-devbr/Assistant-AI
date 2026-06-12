import { useQueryClient, useMutation } from "@tanstack/react-query";

import type { SendMsgType } from "../types/send-msg";
import { sendMessageService } from "../services/send-msg";

export function useSendMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: SendMsgType) =>
            await sendMessageService(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['chats', 'usage']
            })
        }
    })
}