import { waitFor } from '@/lib/helper/waitFor'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import Editor from '../../_components/Editor'

export default async function page({params}:{params:{id:string}}) {
    const {id} = params
    const {userId} = await auth()
    if(!userId) return redirect('/sign-in');
    await waitFor(5000)
    const workflow = await prisma.workFlow.findUnique({
        where: {
            id: id,
            userId: userId
        }
    })
    if(!workflow) 
    {
        return <div>Workflow not found</div>
    }
  return (
 <Editor workflow={workflow}/>
  )
}
