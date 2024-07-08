"use client"
import React, { useState } from 'react'
import { useTransition } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { signinWithCredentials } from '@/actions/authActions';

import { loginSchema } from '@/utlis/schema/authSchema'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'



// if (status === "authenticated") {}

export default function LoginForm() {
    const [isLoading, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null | undefined>(null)
    const [successMsg, setSuccessMsg] = useState<string | null | undefined>(null)
    // const { data: session, status } = useSession()
    const { register, handleSubmit, watch, reset, formState: { errors }, } =
        useForm<z.infer<typeof loginSchema>>({
            resolver: zodResolver(loginSchema),
            defaultValues: { email: "", password: "" },
        })
    const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
        setErrorMsg(null)
        setSuccessMsg(null)
        startTransition(() => {
            signinWithCredentials(data).then((res) => {
                setErrorMsg(res?.error)
                setSuccessMsg(res?.message);
            })
        })
    }
    return (
        <div>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-1'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                    <input type='email' id='email'
                        {...register("email", { required: true })}
                        className='w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500' />
                    {errors.email && <p className='text-red-500 text-xs italic'>{errors.email.message}</p>}
                </div>
                <div className='space-y-1' >
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                    <input type='password' id='password'
                        {...register("password", { required: true })}
                        className='w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500' />
                    {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>}
                </div>
                <FormError message={errorMsg} />
                <FormSuccess message={successMsg} />
                <button type='submit'
                    className={`rounded-md w-full bg-blue-500 
                 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2
                  focus:ring-blue-500 focus:ring-offset-2`}>
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    )
}
