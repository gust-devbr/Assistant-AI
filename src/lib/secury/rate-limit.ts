// lib/rate-limit.ts

import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

const redis = Redis.fromEnv()

export const ratelimit =
    new Ratelimit({
        redis,

        limiter:
            Ratelimit.fixedWindow(
                4,
                "1 d"
            ),
    })