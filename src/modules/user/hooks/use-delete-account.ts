import { useMutation } from "@tanstack/react-query";
import { deleteAccountService } from "../services/delete-account";

export function useDeleteAccount() {
    return useMutation({
        mutationFn: async ({ password }: { password: string }) =>
            await deleteAccountService(password),
    })
}