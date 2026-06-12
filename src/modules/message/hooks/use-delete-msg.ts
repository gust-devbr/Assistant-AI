import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMsgService } from "../services/delete-msg";

export function useDeleteMsg() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string | undefined) =>
            await deleteMsgService(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['messages']
            })
        }
    })
}