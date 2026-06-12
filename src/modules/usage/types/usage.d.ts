export type UsageResponse = {
    type: "guest" | "free"
    used: number
    limit: number
    remaining: number
}