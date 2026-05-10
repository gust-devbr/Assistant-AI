"use client"

import { cn } from "@/lib/utils"

type SelectedOption = 'account' | 'appearance'

const options: {
    label: string,
    key: SelectedOption
}[] = [
        { label: "Conta", key: "account" },
        { label: "Aparência", key: "appearance" },
    ]

type Props = {
    selected: SelectedOption
    setSelected: (value: SelectedOption) => void
}

export function SelectOptions(props: Props) {
    const { selected, setSelected } = props

    return (
        <div className={cn(
            "flex flex-row gap-7 items-center text-lg md:justify-start justify-between",
            "px-8 border-b-2 border-accent text-accent-foreground"
        )}>
            {options.map(op => (
                <button
                    onClick={() => setSelected(op.key)}
                    key={op.key}
                    className={cn(
                        selected === op.key && "border-b-2 border-border"
                    )}
                >
                    {op.label}
                </button>
            ))}
        </div>
    )
}
