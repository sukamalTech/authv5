
import React from 'react'
import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "@/auth";
export default async function NextAuthProviderWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    // if (!session?.user) return null
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}
