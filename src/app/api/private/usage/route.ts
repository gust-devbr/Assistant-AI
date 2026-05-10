import { NextRequest } from "next/server"
import { getToken } from "@/utils/modules/api/auth"
import { Response } from "@/utils"
import { redis } from "@/lib/redis"

export async function GET(req: NextRequest) {
    const user = await getToken(req)

    const deviceId = req.headers.get("x-device-id")

    let key = ""
    let limit = 15
    let type = "guest"

    if (user) {
        key = `free-${user.id}`
        limit = 50
        type = "free"
    } else {
        key = `guest-${deviceId}`
    }

    const used = Number(await redis.get(key)) || 0

    return Response.success({
        type,
        used,
        limit,
        remaining: limit - used
    })
}