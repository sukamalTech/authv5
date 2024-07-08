import { NewVerificationForm } from '@/components/NewVerificationForm'
import React, { Suspense } from 'react'

export default function page() {

    return (
        <Suspense >
            <div className='w-full min-h-screen flex justify-center items-center'>
                <NewVerificationForm />
            </div>
        </Suspense >
    )
}
