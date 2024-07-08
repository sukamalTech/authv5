"use client"
import { signIn } from 'next-auth/react';
// import { login } from '@/actions/authActions'
import React from 'react'

export default function LoginWithGithub() {
    const signInWithGithub = async () => {
        await signIn("github", { callbackUrl: "/" });
        // when you using signIn() from client side, you need to import from 'next-auth/react'
        // and instead of redirectTo use callbackUrl
    }
    return (
        <button className='w-full h-10 bg-black text-white '
            onClick={signInWithGithub}>
            Login with Github
        </button>
    )
}
