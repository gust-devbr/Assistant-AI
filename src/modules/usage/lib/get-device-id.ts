// lib/device.ts

export function generateDeviceId() {
    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2)
    )
}

export function getDeviceId() {
    if (typeof window === "undefined") {
        return null
    }

    let id =
        localStorage.getItem(
            "device-id"
        )

    if (!id) {
        id = generateDeviceId()

        localStorage.setItem(
            "device-id",
            id
        )
    }

    return id
}