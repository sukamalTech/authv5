"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
interface LoginBtnProps {
    children: React.ReactNode,
    mode?: 'modal' | 'redirect',
    asChild?: boolean,
}
export function LoginBtn({ children, mode = 'redirect', asChild }: LoginBtnProps) {
    const router = useRouter()
    const onClick = () => {
        router.push('/login')
    }
    if (mode === 'modal') {
        return (
            <span className='cursor-pointer' onClick={onClick}>
                TODO:implement modal login

            </span>
        )
    }
    return (
        <span className='cursor-pointer' onClick={onClick}>
            {children}

        </span>
    )
}


// our database not support edge functionality for that auth() function do not work with callback and redirect and events.