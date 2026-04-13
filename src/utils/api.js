export async function apiFetch(url, options = {}) {
    const response = await fetch(`/api/${url}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options
    });

    if (!response.ok) throw new Error("Erro na requisição");

    return response.json();
};