import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import { AppNodeData } from "@/types/appNode";
import NodeHeader from "./NodeHeader";
import { taskRegistry } from "@/lib/workflow/task/registry";
import { NodeInput } from "./NodeInputs";
import { NodeInputs } from "./NodeInputs";

export const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = taskRegistry[nodeData.type];
  console.log('task: ', task);
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input, index) => (
          <NodeInput key={index} input={input} nodeId={props.id}/>
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

NodeComponent.displayName = "NodeComponent";
