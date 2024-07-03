"use client"
import React from 'react'

export default function AuthBtn() {

    return (
        <div>
            <button type='submit'
                className={`rounded-md w-full bg-blue-500 
                 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2
                  focus:ring-blue-500 focus:ring-offset-2`}>
                Login
            </button>

        </div>
    )
}
