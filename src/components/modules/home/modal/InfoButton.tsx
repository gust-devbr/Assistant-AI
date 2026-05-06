import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"

export function InfoButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Info className="w-5 h-5" />
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-900 text-white">
                <DialogHeader>
                    <DialogTitle className="text-3xl">Opções de Chat</DialogTitle>
                </DialogHeader>

                <p className="text-[18px] gap-1 flex flex-col">
                    <strong className="text-xl">• Explicação:</strong> Explicar assuntos do seu tópico <br />
                    <strong className="text-xl">• Resumo:</strong> Criar resumos <br />
                    <strong className="text-xl">• Questões:</strong> Criar número X de questões que escolher <br />
                    <strong className="text-xl">• Dúvida:</strong> Tirar dúvidas sobre estudos
                </p>
            </DialogContent>
        </Dialog>
    )
};