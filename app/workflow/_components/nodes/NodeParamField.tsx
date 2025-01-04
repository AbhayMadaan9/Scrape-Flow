import { Input } from '@/components/ui/input'
import { TaskParam, TaskParamType } from '@/types/tasks'
import React, { useCallback } from 'react'
import StringParam from './param/StringParam'
import { useReactFlow } from '@xyflow/react'
import { AppNode, ParamProps } from '@/types/appNode'

export default function NodeParamField({param, nodeId}: {param: TaskParam, nodeId: string}) {
  const {updateNodeData, getNode} = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data?.inputs?.[param.type];

  const updateNodeParamValue = useCallback((newValue: string)=>{
    updateNodeData(nodeId, {
     ...node.data,
      inputs: {
       ...node.data.inputs,
        [param.type]: newValue,
      }
    })
  }, [updateNodeData, nodeId, node.data, param.type])
switch (param.type) {
  case TaskParamType.STRING:
    return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamValue}/>
  default: return (
    <div className='w-full'>
      <p className='text-sm text-muted-foreground'>Not implemented</p>
    </div>
  )
}
}
