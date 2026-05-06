import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const userService = {
    findByUserName: async (userName: string) => {
        return await prisma.user.findFirst({
            where: { userName },
            select: {
                id: true,
                name: true,
                userName: true,
                password: true
            }
        });
    },

    findById: async (id: string) => {
        return await prisma.user.findFirst({ where: { id } });
    },

    register: async (name: string, userName: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        return await prisma.user.create({
            data: { name, userName, password: hashedPassword }
        });
    },

    update: async (id: string, name: string, userName: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(userName && { userName }),
                ...(password && { password: hashedPassword }),
            }
        })
    },

    delete: async (id: string) => {
        await prisma.user.delete({ where: { id } })
    },
};