"use client"
import { logout } from '@/actions/authActions'
import React from 'react'

export default function LogOutBtn() {
    return (
        <button className='bg-black text-white' onClick={() => logout()}>
            Log out
        </button>
    )
}
