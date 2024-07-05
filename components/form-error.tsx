import React from 'react'
interface Props {
    message?: string | null | undefined;
}
export function FormError({ message }: Props) {
    if (!message) return null
    return (
        <div className='flex items-center justify-center text-red-500 text-sm'>
            <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' /></svg>
            {message}

        </div>
    )
}
