import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import { AppNodeData } from "@/types/appNode";
import NodeHeader from "./NodeHeader";

export const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  return <NodeCard nodeId={props.id} isSelected={!!props.selected}><NodeHeader taskType = {nodeData.type} /></NodeCard>;
});

NodeComponent.displayName = "NodeComponent";
