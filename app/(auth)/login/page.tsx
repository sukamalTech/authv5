import LoginForm from '@/components/LoginForm'
import LoginWithGithub from '@/components/LoginWithGithub'
import React from 'react'

export default function Login() {
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <section>
                <div className='w-full max-w-md space-y-8 bg-white shadow-md rounded-lg p-10'>
                    <h1>Log In</h1>
                    <LoginForm />
                    <LoginWithGithub />
                </div>
            </section>
        </div>
    )
}
