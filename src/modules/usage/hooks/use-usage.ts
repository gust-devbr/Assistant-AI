import { useQuery } from "@tanstack/react-query";
import { usageService } from "../services/usage";

export function useUsage() {
    const { data, ...query } = useQuery({
        queryKey: ['usage'],
        queryFn: async () => await usageService(),
    })

    const reached =
        data?.limit !== undefined &&
        data?.used !== undefined &&
        data.used >= data.limit

    return {
        remaining: data?.remaining,
        used: data?.used,
        type: data?.type,
        limit: data?.limit,
        reached,
        ...query
    }
}