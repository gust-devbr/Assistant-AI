import { useUsage } from "@/hooks/useUsage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"

export function LimiteUsageCard() {
    const { limit, used, type } = useUsage()

    let progress: number = 0

    if (used && limit) {
        progress = (used / limit) * 100
    }

    return (
        <Card className="w-full my-5">
            <CardHeader>
                <CardTitle>{type?.toUpperCase()}</CardTitle>
                <CardDescription className="flex flex-row items-center justify-between">
                    Limite de mensagens
                    <span>
                        {used}/{limit}
                    </span>
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <Progress value={progress} max={limit} />
                <p>Limite diário de {limit} mensagens</p>
            </CardContent>
        </Card>
    )
}
