import { useQueryClient, useMutation } from "@tanstack/react-query";
import { pinChatService } from "../services/pin-chat";

export function usePinChat() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id }: { id: string }) =>
            await pinChatService(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["chats"]
            })
        }
    })
}