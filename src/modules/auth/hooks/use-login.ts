import { useRouter } from "next/navigation";

import type { LoginSchemaType } from "../schemas/login-schema";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login";

export function useLogin() {
    const router = useRouter()

    return useMutation({
        mutationFn: async (data: LoginSchemaType) =>
            await loginService(data),

        onSuccess: () =>
            router.replace(`/screens/home/${null}`)
    })
}