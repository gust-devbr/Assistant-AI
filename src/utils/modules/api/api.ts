// export async function apiFetch(url: string, options: RequestInit = {}) {
//     const token = localStorage.getItem("token");

//     const res = await fetch(`/api/${url}`, {
//         ...options,
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//             ...options.headers,
//         },
//     });

//     if (res.status === 401) {
//         localStorage.removeItem("token")
//     }

//     const data = await res.json()

//     return {
//         ok: res.ok,
//         ...data
//     }

// };
export async function apiFetch(url: string, options: RequestInit = {}) {
    const res = await fetch(`/api/${url}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options
    })

    const data = await res.json()

    return {
        ok: res.ok,
        ...data
    }

};