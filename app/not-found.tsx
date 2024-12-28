import React from 'react'
import Link from 'next/link'
export default function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='text-center'>
      <h1 className='text-4xl text-primary mb-4
     font-semibold'>404 - Page Not Found</h1>
      <p className='text-lg text-gray-500'>The page you are looking for does not exist.</p>
      <Link href="/">Go back to the homepage</Link>
        </div>

    </div>
  )
}
