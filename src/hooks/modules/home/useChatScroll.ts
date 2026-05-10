import { useEffect, useRef } from "react";

export function useChatScroll(dep: unknown) {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [dep]);

    return bottomRef;
}