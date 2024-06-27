import LoginWithGithub from '@/components/LoginWithGithub'
import React from 'react'

export default function page() {
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <section>
                <div className='w-full max-w-md space-y-8 bg-white shadow-md rounded-lg p-10'>
                    <h1>Log In</h1>
                    <form>
                        <div className='space-y-4'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' name='email' className='w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500' />
                        </div>
                        <div className='space-y-4'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' name='password' className='w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <input type='checkbox' id='remember' name='remember' className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                                <label htmlFor='remember' className='ml-2 block text-sm text-gray-900'>Remember me</label>
                            </div>
                            <div className='text-sm'>
                                <a href='#'>Forgot your password?</a>
                            </div>
                        </div>
                        <div className='flex items-center justify-end space-x-2'>
                            <button type='submit' className='rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>Log in</button>
                        </div>
                    </form>
                    <LoginWithGithub />
                </div>
            </section>
        </div>
    )
}
