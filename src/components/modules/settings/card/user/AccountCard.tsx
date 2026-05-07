"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DeleteAccountModal } from "../../modal/user/DeleteAccount"
import { EditPassModal } from "../../modal/user/EditPass"
import { DeleteAllChats } from "../../modal/user/DeleteChats"

export function AccountCard() {
    return (
        <Card className="md:h-full">
            <CardHeader>
                <CardTitle className="text-xl">Conta</CardTitle>
            </CardHeader>

            <Separator className="border border-accent" />

            <CardContent className="flex flex-col gap-3">
                <DeleteAccountModal />
                <Separator className="border border-accent" />
                <EditPassModal />
                <Separator className="border border-accent" />
                <DeleteAllChats />
            </CardContent>
        </Card>
    )
}
