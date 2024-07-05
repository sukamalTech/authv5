import { auth } from '@/auth'
import React from 'react'

export default async function Middleware() {
    const session = await auth()
    return (
        <div className='w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
            <h1>Middleware Page</h1>
            <p>{session?.user?.email}</p>
        </div>
    )
}
