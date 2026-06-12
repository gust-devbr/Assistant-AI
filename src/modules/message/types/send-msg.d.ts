import { ParamValue } from "next/dist/server/request/params"
import { Message } from "@/modules/chat/types/chat"
import { MsgTypeProps } from "./message"

export type SendMsgType = {
    message: string,
    history: Message[],
    type: MsgTypeProps,
    chatId: ParamValue | undefined
}