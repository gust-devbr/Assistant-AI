import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logoutService } from "../services/logout";
import { useRouter } from "next/navigation";

export function useLogout() {
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () =>
            await logoutService(),

        onSuccess: () => {
            queryClient.setQueryData(["user"], null)
            router.replace("/screens/home/null")
        }
    })
}