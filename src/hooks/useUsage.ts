/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { getDeviceId } from "@/lib/secury/getDeviceId"
import { apiFetch } from "@/utils"
import { useCallback, useEffect, useState } from "react"

type UsageResponse = {
    type: "guest" | "free"
    used: number
    limit: number
    remaining: number
}

export function useUsage() {
    const [data, setData] = useState<UsageResponse | null>(null)

    const fetchUsage = useCallback(async () => {
        const res = await apiFetch("/private/usage", {
            method: "GET",
            headers: { "x-device-id": getDeviceId() || "" }
        })
        const data = res?.data
        setData(data)
    }, [])

    useEffect(() => {
        fetchUsage()
    }, [fetchUsage])

    let reached: boolean = false

    if (data?.limit && data.used) {
        reached = data.used >= data.limit
    }

    return {
        remaining: data?.remaining,
        used: data?.used,
        type: data?.type,
        limit: data?.limit,
        reached,
        refetch: fetchUsage
    }
}