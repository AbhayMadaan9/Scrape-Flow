import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";

export const NodeComponent = memo((props: NodeProps) => {
  return <NodeCard nodeId={props.id} isSelected={!!props.selected}>AppNode</NodeCard>;
});

NodeComponent.displayName = "NodeComponent";
