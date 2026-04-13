import { prisma } from "@/lib/prisma";

export const msgService = {
    getAll: async (chatId) => {
        return await prisma.message.findMany({ where: { chatId } });
    },

    create: async (chatId, message, reply) => {
        await prisma.message.create({
            data: { content: message, role: "user", chatId }
        });

        await prisma.message.create({
            data: { content: reply, role: "assistant", chatId }
        });
    },

    delete: async (id) => {
        await prisma.message.delete({ where: { id } });
    }
};