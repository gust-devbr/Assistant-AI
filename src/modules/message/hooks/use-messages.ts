import { useQuery } from "@tanstack/react-query";
import { getMessageService } from "../services/get-msg";
import { ParamValue } from "next/dist/server/request/params";

export function useGetMessages({ chatId }: { chatId: ParamValue | undefined }) {
    return useQuery({
        queryKey: ['messages'],
        queryFn: async () => await getMessageService(chatId),
        enabled: !!chatId && chatId !== "null",
    })
}