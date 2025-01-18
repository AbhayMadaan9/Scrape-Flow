"use client";

import useFlowValidation from "@/components/hooks/useFlowValidation";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import { ReactNode } from "react";

export default function NodeCard({
  isSelected,
  nodeId,
  children,
}: {
  isSelected: boolean;
  nodeId: string;
  children: ReactNode;
}) {
  const { getNode, setCenter } = useReactFlow();
  const {invalidInputs} = useFlowValidation();
  const hasInvalidInputs = invalidInputs?.some((node)=>node.nodeId === nodeId)
  return (
    <div
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate p-2 w-[420px] text-xs gap-1 flex-col",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!measured || !position) return;
        const { width, height } = measured;
        const { x, y } = position;
        if (
          x === undefined ||
          y === undefined ||
          width === undefined ||
          height === undefined
        )
          return;

        const { x: centerX, y: centerY } = {
          x: x + width / 2,
          y: y + height / 2,
        };
        setCenter(centerX, centerY, { zoom: 1, duration: 500 });
      }}
    >
      {children}
    </div>
  );
}
