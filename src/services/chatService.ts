import { prisma } from "@/lib/prisma";

export const chatService = {
    findAll: async (userId: string) => {
        return await prisma.chat.findMany({
            where: { userId },
            orderBy: [
                { fixed: "desc" },
                { createdAt: "desc" }
            ]
        });
    },

    findById: async (id: string) => {
        return await prisma.chat.findFirst({ where: { id } });
    },

    create: async (title: string, userId: string) => {
        return await prisma.chat.create({ data: { title, userId } });
    },

    delete: async (id: string) => {
        return await prisma.chat.delete({ where: { id } });
    },

    update: async (id: string) => {
        const chat = await prisma.chat.findUnique({ where: { id } });
        if (!chat) throw new Error("Chat não encontrado");

        return await prisma.chat.update({
            where: { id },
            data: { fixed: !chat.fixed }
        });
    },

    rename: async (title: string, id: string) => {
        return await prisma.chat.update({
            where: { id },
            data: { title }
        });
    },

    deleteAll: async (userId: string) => {
        await prisma.chat.deleteMany({ where: { userId } })
    }
};