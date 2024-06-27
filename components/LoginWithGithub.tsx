"use client"
import { login } from '@/actions/authActions'
import React from 'react'

export default function LoginWithGithub() {
    return (
        <button className='w-full h-10 bg-black text-white '
            onClick={() => login("github")}>
            Login with Github
        </button>
    )
}
