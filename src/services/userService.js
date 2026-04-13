import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const userService = {
    findByUserName: async (userName) => {
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

    findById: async (id) => {
        return await prisma.user.findFirst({ where: { id } });
    },

    register: async (name, userName, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        return await prisma.user.create({
            data: { name, userName, password: hashedPassword }
        });
    }
};