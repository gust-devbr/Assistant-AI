import { prisma } from "@/lib/prisma";

export const chatService = {
    findAll: async (userId) => {
        return await prisma.chat.findMany({
            where: { userId },
            orderBy: [
                { fixed: "desc" },
                { createdAt: "desc" }
            ]
        });
    },

    findById: async (id) => {
        return await prisma.chat.findFirst({ where: { id } });
    },

    create: async (title, userId) => {
        return await prisma.chat.create({ data: { title, userId } });
    },

    delete: async (id) => {
        return await prisma.chat.delete({ where: { id } });
    },

    update: async (id) => {
        const chat = await prisma.chat.findUnique({ where: { id } });
        if (!chat) throw new Error("Chat não encontrado");

        return await prisma.chat.update({
            where: { id },
            data: { fixed: !chat.fixed }
        });
    },

    rename: async (title, id) => {
        return await prisma.chat.update({
            where: { id },
            data: { title }
        });
    }
};