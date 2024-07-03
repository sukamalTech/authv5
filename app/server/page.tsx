import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Server() {
    const session = await auth()
    if (!session?.user) {
        redirect('/login')
    }
    return (
        <div className='w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
            <h1>Server Page</h1>
            <p>{session?.user?.email}</p>
        </div>
    )
}