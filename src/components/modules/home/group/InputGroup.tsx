"use client"

import { MsgTypeProps } from "@/types"
import { Send } from "lucide-react"
import { InfoButton } from "../modal/InfoButton"
import { cn } from "@/lib/utils"

type Props = {
    type: MsgTypeProps
    setType: (value: MsgTypeProps) => void
    loading: boolean
    message: string
    setMessage: (value: string) => void
    onSubmit: () => void

}

export function MsgGroupInput(props: Props) {
    const { type, setType, message, setMessage, loading, onSubmit } = props

    return (
        <div className="p-4 border-t border-zinc-600 flex flex-col md:flex-row gap-3 items-center">
            <div className="flex flex-row items-center gap-1 w-full md:w-40">
                <InfoButton />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as MsgTypeProps)}
                    className="border border-zinc-600 md:w-32 w-full rounded-md px-3 py-4 text-md"
                >
                    <option value="explicacao">Explicação</option>
                    <option value="resumo">Resumo</option>
                    <option value="questao">Questões</option>
                    <option value="duvida">Dúvida</option>
                </select>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
                className="w-full relative"
            >
                <input
                    disabled={loading}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="w-full border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none"
                />

                <button
                    type="submit"
                    // onClick={onSubmit}
                    disabled={!message || loading}
                    className={cn(
                        "px-2 py-1 rounded-xl font-medium transition active:scale-95",
                        "absolute right-2 top-1/2 -translate-y-1/2",
                        !message && "opacity-50 cursor-not-allowed",
                    )}
                >
                    <Send className="text-primary w-7! h-7!" />
                </button>
            </form>
        </div>
    )
}