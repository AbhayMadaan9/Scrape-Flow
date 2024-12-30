import Logo from '@/components/Logo'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <div>
      {children}
      <Separator />
      <footer className='flex justify-center items-center p-2'>
        <Logo iconSize={16} fontSize='text-xl'/>
        <ModeToggle/>
      </footer>
    </div>
  )
}
