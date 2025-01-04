"use client"
import { updateWorkFlow } from '@/actions/workflows/updateWorkflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon, Loader2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'


export default function SaveBtn({workflowId}: {workflowId: string}) {
  const {toObject} = useReactFlow();
  const saveMutation = useMutation({
    mutationFn: updateWorkFlow,
    onSuccess: ()=>{
      toast.success('Workflow saved successfully', {id:"saving-workflow"})
    },
    onError: ()=>{
      toast.error('Failed to save workflow', {id:"saving-workflow"})
    }
  })
  return (
   <Button variant={'ghost'} className='flex items-center gap-2' onClick={()=>{
    const workFlowDefinition = JSON.stringify(toObject());
    toast.loading("Saving Workflow...", {id:"saving-workflow"});
    saveMutation.mutate({id: workflowId, definition: workFlowDefinition})
   }}
   disabled={saveMutation.isPending}
   >
     {saveMutation.isPending ? (
      <Loader2 size={16} className='animate-spin' />
    ) : (
      <CheckIcon size={16} className='stroke-green-400' />
    )}
Save
   </Button>
  )
}

