export async function refresh_token(token) {
    const res = await fetch(process.env.API_URL+"dj-rest-auth/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refresh: token
        }),
    })
    if (res.status == 200) {
        const refresh = await res.json()
        // Any object returned will be saved in `user` property of the JWT
        return refresh
    }

    return null
}
