import React from 'react'
interface Props {
    message?: string | null | undefined;
}
export function FormSuccess({ message }: Props) {
    if (!message) return null
    return (
        <div className='flex items-center justify-center text-green-500 text-sm'>
            <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z' clipRule='evenodd' /></svg>
            {message}

        </div>
    )
}
