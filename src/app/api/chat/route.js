import { sendMessage } from "@/lib/cohere";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { message, type, history } = await req.json();

        const response = await sendMessage(message, type, history);
        return NextResponse.json({ reply: response.text }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err?.message }, { status: 500 });
    }
};