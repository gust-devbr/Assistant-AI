import { useQuery } from "@tanstack/react-query";

import { getUserService } from "../services/get-user";

export function useUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => await getUserService()
    })
}