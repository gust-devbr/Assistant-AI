"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Trash2 } from "lucide-react"

type Props = {
    onDelete: () => void
}

export function MsgOptionsPortal({ onDelete }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <EllipsisVertical className="w-4! h-4!" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-12">
                <Button
                    title="Deletar mensagem"
                    onClick={onDelete}
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                >
                    <Trash2 />
                </Button>
            </PopoverContent>
        </Popover>
    )
};