import { useQueryClient, useMutation } from "@tanstack/react-query";

import type { UpdateUserSchemType } from "../schemas/update-schema";
import { updateUserService } from "../services/update-user";

export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: UpdateUserSchemType) =>
            await updateUserService(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}