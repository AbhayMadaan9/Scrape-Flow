import { Loader2 } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Loader2 size={30} className='animate-spin stroke-primary'/>
    </div>
  )
}
