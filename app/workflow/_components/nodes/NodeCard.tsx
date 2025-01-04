"use client";

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

  return (
    <div
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate p-2 w-[420px] text-xs gap-1 flex-col",
        isSelected && "border-primary"
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
