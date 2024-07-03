"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast, Toaster } from 'react-hot-toast'
import AuthBtn from './AuthBtn';
import { signinWithCredentials } from '@/actions/authActions';
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation';
export interface LoginInputs {
    email: string;
    password: string;
}


// if (status === "authenticated") {}

export default function LoginForm() {
    const { data: session, status } = useSession()
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<LoginInputs>()
    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        const response = await signinWithCredentials(data)
        console.log("Client", session);

        if (!response) {
            toast.error("Something went wrong")
            return
        }
        if (response.error) {
            // @ts-ignore
            toast.error(response.message)
            return
        }
        if (response.status === 200) {
            toast.success(response.message)
            redirect("/")
        }
    }
    return (
        <div>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-1'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                    <input type='email' id='email'
                        {...register("email", { required: true })}
                        className='w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500' />
                </div>
                <div className='space-y-1' >
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                    <input type='password' id='password'
                        {...register("password", { required: true })}
                        className='w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500' />
                </div>

                <button type='submit'
                    className={`rounded-md w-full bg-blue-500 
                 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2
                  focus:ring-blue-500 focus:ring-offset-2`}>
                    Login
                </button>
            </form>
        </div>
    )
}
