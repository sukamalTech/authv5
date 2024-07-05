import Link from 'next/link'
import React from 'react'
import LogOutBtn from './LogOutBtn'
import { auth } from '@/auth'

export default async function Navbar() {
    const session = await auth()

    return (
        <nav className='max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 border-b border-gray-200'>
            <Link href='/'>Home</Link>
            <div className='flex items-center justify-center space-x-4'>
                <Link href='/settings'>Settings</Link>
                <Link href='/server'>Server</Link>
            </div>
            <div className='flex items-center justify-center space-x-4'>
                {session ? (
                    <LogOutBtn />
                ) : (
                    <>

                        <Link href='/login'>Log In</Link>
                        <Link href='/signup'>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    )
}
