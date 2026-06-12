import { apiFetch } from "next-lib-utils";
import { SendMsgType } from "../types/send-msg";
import { getDeviceId } from "@/modules/usage/lib/get-device-id";

export async function sendMessageService(data: SendMsgType) {
    const res = await apiFetch("/private/message", {
        method: "POST",
        headers: { "x-device-id": getDeviceId() || "" },
        body: JSON.stringify(data)
    })
    return res.data
}