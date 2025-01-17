import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import { AppNodeData } from "@/types/appNode";
import NodeHeader from "./NodeHeader";
import { taskRegistry } from "@/lib/workflow/task/registry";
import { NodeInput } from "./NodeInputs";
import { NodeInputs } from "./NodeInputs";
import { NodeOutput } from "./NodeOutputs";
import { NodeOutputs } from "./NodeOutputs";
import { Badge } from "@/components/ui/badge";


const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true"; 
export const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = taskRegistry[nodeData.type];
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      {DEV_MODE && <Badge>DEV:{props.id}</Badge>}
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <NodeInputs>
        {task.inputs.map((input, index) => (
          <NodeInput key={index} input={input} nodeId={props.id}/>
        ))}
      </NodeInputs>

      <NodeOutputs>
        {task.outputs.map((output, index) => (
          <NodeOutput key={index} output={output} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

NodeComponent.displayName = "NodeComponent";
