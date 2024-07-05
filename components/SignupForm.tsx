"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast, Toaster } from 'react-hot-toast'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import AuthBtn from './AuthBtn';
import { registerSchema } from '@/utlis/schema/authSchema';
import { signupWithCredentials } from '@/actions/authActions';
import { useRouter } from "next/navigation";
export default function SignupForm() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {}

    })
    const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (data) => {
        const res = await signupWithCredentials(data);

        if (res.error) {
            // @ts-ignore
            toast.error(res.error);
        } else {
            // @ts-ignore
            toast.success(res?.message);
            router.push("/signin")
            reset()
        }
    }
    return (
        <div>
            <form className='w-full space-y-2' onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-1'>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
                    <input type='text' id='name'
                        {...register("name", { required: true })}
                        className='w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500' />
                    {errors.name && <p className='text-rose-500 text-xs'>{errors.name.message}</p>}
                </div>
                <div className='space-y-1'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                    <input type='email' id='email'
                        {...register("email", { required: true })}
                        className='w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500' />
                    {errors.email && <p className='text-rose-500 text-xs'>{errors.email.message}</p>}
                </div>
                <div className='space-y-1' >
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                    <input type='password' id='password'
                        {...register("password", { required: true })}
                        className='w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500' />
                    {errors.password && <p className='text-rose-500 text-xs'>{errors.password.message}</p>}
                </div>

                <AuthBtn />
            </form>
        </div>
    )
}
