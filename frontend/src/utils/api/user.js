export async function get_user(accessToken){
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`/dj-rest-auth/user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    })
    if (res.ok) {
        const data = await res.json()
        return data
    }
    else {
        const responseData = await res.json()
        return {ok: false, errors: responseData}
    }
}