import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function Home() {
  const session = await getServerSession(authOptions)

  const notLoggedIn = <>
    <h2>You are not logged in. No cookies for you</h2>
    <Link href="/api/auth/signin"><h4>Login</h4></Link>
  </>

  const loggedIn = <>
    <h2>You are logged in! Here's a cookie</h2>
      <Image
        src="/cookie.png"
        alt="Vercel Logo"
        width={100}
        height={100}
        priority
              />
      <h6><a href="https://www.flaticon.com/free-icons/cookie" title="cookie icons">Cookie icons created by Freepik - Flaticon</a></h6>
      <Link href="/api/auth/signout"><h4>Logout</h4></Link>
  </>

  return <>
    <div style={{margin: '1.5rem'}}>
      {session?.access ? loggedIn : notLoggedIn }
    </div>
  </>
}
