/* eslint-disable @typescript-eslint/no-require-imports */
import { cn } from "@/lib/utils";
import { BookCheck, Brain, CircleQuestionMark, LucideIcon, NotebookText } from "lucide-react";
import Image from "next/image";

type SidebarProps = {
    side?: "left" | "right"
}

type OpData = {
    title: string,
    description: string
    Icon: LucideIcon
}

const optionsData: OpData[] = [
    {
        title: "Explicações de assuntos",
        description: "Explica assuntos de forma clara e com exemplos",
        Icon: Brain
    },
    {
        title: "Resumos inteligentes",
        description: "Gera resumos para ajuda nos seus estudos",
        Icon: NotebookText

    },
    {
        title: "Questões práticas",
        description: "Gera questões de sua escolha para treinar seus conhecimentos",
        Icon: BookCheck
    },
    {
        title: "Tire suas dúvidas",
        description: "A IA responderá suas dúvidas sobre estudos",
        Icon: CircleQuestionMark
    }
]

export function AuthSidebar({ side = "left" }: SidebarProps) {
    return (
        <aside
            className={cn(
                "hidden lg:flex w-[500px] lg:flex-col gap-5 p-5 text-white lg:items-start",
                "bg-linear-to-br from-blue-600 to-blue-900",
                side === "right" ? "order-2" : "order-1"
            )}
        >
            <header className="flex flex-row items-center gap-0.5">
                <Image
                    src={require("@/assets/chatbot-icon.png")}
                    width={120}
                    height={120}
                    alt="ChatBot Icon"
                />

                <p className="font-extrabold text-[24px]">Assistant</p>
                <p className="text-[22px]">AI</p>
            </header>

            <section className="flex flex-col gap-5 mt-5">
                <span className="text-4xl">
                    Aprenda mais. <br /> Estude <span className="text-blue-400">melhor</span>
                </span>

                <span className="text-[18px]">O seu assistente de estudos com IA <br /> para ajudar você nos seus estudos</span>
            </section>

            <section className="space-y-5 mt-5">
                {optionsData.map(op => (
                    <span key={op.title} className="flex flex-row items-center gap-2">
                        <op.Icon className="w-10 h-10 border rounded-sm bg-blue-800 border-blue-700" />

                        <div className="flex flex-col">
                            <p className="text-[22px]">{op.title}</p>
                            <p className="font-heading text-[16px]">{op.description}</p>
                        </div>
                    </span>
                ))}
            </section>
        </aside>
    )
}