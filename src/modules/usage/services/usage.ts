import { apiFetch } from "next-lib-utils";
import { UsageResponse } from "../types/usage";
import { getDeviceId } from "../lib/get-device-id";

export async function usageService(): Promise<UsageResponse> {
    const res = await apiFetch("/private/usage", {
        method: "GET",
        headers: { "x-device-id": getDeviceId() || "" }
    })
    const data: UsageResponse = res.data
    return data
}