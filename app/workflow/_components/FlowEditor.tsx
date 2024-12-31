"use client"
import { WorkFlow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import React, { useState } from 'react'
import "@xyflow/react/dist/style.css"
import { CreateFlowNode } from '@/lib/workflow/CreateFlowNode'
import { TaskType } from '@/types/tasks'
import { NodeComponent } from './nodes/NodeComponent'

const nodeTypes = {
  Node: NodeComponent,
}
export default function FlowEditor({workflow}:{workflow:WorkFlow}) {
    const [nodes, setNodes, onNodesChange] = useNodesState([CreateFlowNode(TaskType.LUNCH_BROWSER)])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
  return (
    <main className='h-full w-full'>
      <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      >
        <Controls position='top-left'/>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        
        </ReactFlow>
    </main>
  )
}