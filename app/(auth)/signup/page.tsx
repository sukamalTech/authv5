import SignupForm from '@/components/SignupForm'
import { Sign } from 'crypto'
import React from 'react'

export default function Signup() {
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <section>
                <div className='w-full max-w-md space-y-8 bg-white shadow-md rounded-lg p-10'>
                    <h1>Log In</h1>
                    <SignupForm />
                </div>
            </section>
        </div>
    )
}
