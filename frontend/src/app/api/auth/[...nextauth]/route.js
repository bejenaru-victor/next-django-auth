import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {refresh_token} from '@/utils/api/token'
import { get_user } from '@/utils/api/user'


export const authOptions = {
    providers: [
        CredentialsProvider({

            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {

                // Login
                let url = "dj-rest-auth/login/"
                let body = {
                    username: credentials?.username,
                    password: credentials?.password,
                }

                // Register
                if (credentials?.username && credentials?.password2) {
                    url = "dj-rest-auth/registration/"
                    body = {
                        username: credentials?.username,
                        password1: credentials?.password1,
                        password2: credentials?.password2,
                    }
                }

                const res = await fetch(process.env.API_URL + url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                })

                const user = await res.json()
                if ((res.status == 200 && user) || (user?.access)) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    if (credentials?.username && credentials?.password2)
                        throw new Error(JSON.stringify(user))
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],

    session: {
        strategy: 'jwt',
    },

    jwt: {
        secureCookie: true,
    },

    callbacks:{

        async jwt({ token, user, trigger }) {
            if (typeof token.access !== "undefined") {
                const isAccessExpired = 0 > (Date.parse(token.access_expiration) - Date.now())
                if (isAccessExpired) {
                    const refresh = await refresh_token(token.refresh)
                    if (refresh) {
                        token.access = refresh.access
                        token.access_expiration = refresh.access_expiration
                    } else return {}
                }
            }
            
            if (user)
                token = {...token, ...user, exp: Date.now(), iat: Date.now()}

            else if (trigger === "update") 
                token.user = await get_user(token.access)

            return token
        },

        async session({ session, token, user }) {
            if (token)
                session = {
                    ...session,
                    access: token.access,
                    access_expiration: token.access_expiration,
                    user: token.user
                }

            else session = {}

            return session
        }
    }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
