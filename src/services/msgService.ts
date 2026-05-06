import { prisma } from "@/lib/prisma";

export const msgService = {
    getAll: async (chatId: string) => {
        return await prisma.message.findMany({ where: { chatId } });
    },

    create: async (chatId: string, message: string, reply: string) => {
        await prisma.message.create({
            data: { content: message, role: "user", chatId }
        });

        await prisma.message.create({
            data: { content: reply, role: "assistant", chatId }
        });
    },

    delete: async (id: string) => {
        await prisma.message.delete({ where: { id } });
    }
};