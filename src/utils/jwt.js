import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const jwtUtil = {
    generate: (payload) => {
        return jwt.sign({ id: payload.id }, JWT_SECRET, { expiresIn: "1d" })
    },

    verify: (token) => {
        return jwt.verify(token, JWT_SECRET);
    }
};