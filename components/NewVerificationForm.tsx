"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { verificationNewToken } from '@/actions/user-verification'
import { FormError } from './form-error'
import Link from 'next/link'

export function NewVerificationForm(
) {
    const [error, setError] = useState<null | string | undefined>(null)
    const [success, setSuccess] = useState(false)
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter()
    const onsubmit = useCallback(async () => {
        setError(null)
        setSuccess(false)
        const verify = await verificationNewToken(token)
        if (verify.success) {
            setSuccess(true)
        }
        if (verify.error) {
            setError(verify.error)
        }
    }, [token])
    useEffect(() => {
        onsubmit();
    }, [onsubmit])
    return (

        <div className='w-72 h-auto p-5 bg-white rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h1 className='text-xl font-bold text-center'>
                {success ? `Your Email Verification completed` : `Your Email Verification is Under Process`}</h1>
            <FormError message={error} />
            {success ?
                <Link href='/login' className='mt-5 text-center'>
                    Back to Login
                </Link> : <></>}
        </div>
    )
}
