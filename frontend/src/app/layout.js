import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SignOut from '@/components/fn/SignOut'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'next-django-auth',
  description: '',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">

      {/* if session token is alive but refresh expired
      the <SignOut /> component is signing out and deleting session cookie*/}
      {(session && !session.access) && <SignOut />}

      <body className={inter.className}>{children}</body>
    </html>
  )
}
