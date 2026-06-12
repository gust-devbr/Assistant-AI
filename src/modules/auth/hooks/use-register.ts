import { useRouter } from "next/navigation";

import type { RegisterSchemaType } from "../schemas/register-schema";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "../services/register";

export function useRegister() {
    const router = useRouter()

    return useMutation({
        mutationFn: async (data: RegisterSchemaType) =>
            await registerService(data),

        onSuccess: () =>
            router.replace(`/screens/home/${null}`)
    })
}