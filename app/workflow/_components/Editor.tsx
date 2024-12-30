import { WorkFlow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'

export default function Editor({workflow}:{workflow:WorkFlow}) {
  return (
   <ReactFlowProvider>
    <div className='flex flex-col h-screen w-full overflow-hidden'>
<section className='flex h-full overflow-auto'>
    <FlowEditor workflow={workflow}/>
</section>
    </div>
   </ReactFlowProvider>
  )
}
