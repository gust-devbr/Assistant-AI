import { apiFetch } from "@/utils";

export function useDeleteMessage() {
    async function handleDeleteMsg(id?: string) {
        if (!id) return;

        await apiFetch(`/private/message/${id}/delete`, {
            method: "DELETE",
        });

        window.location.reload();
    }

    return {
        handleDeleteMsg,
    };
}