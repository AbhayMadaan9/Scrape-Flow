import { useReactFlow } from "@xyflow/react";
import React, { useCallback } from "react";
import FlowToExecutionPlan from "./executionPlan";
import { AppNode } from "@/types/appNode";

export default function useExecutionPlan() {
  const { toObject } = useReactFlow();

  const generateExecutionPlan = useCallback(() => {
      const { nodes, edges } = toObject();
      const { executionPlan } = FlowToExecutionPlan(nodes as AppNode[], edges);
      return executionPlan;

  }, [toObject]);
  return generateExecutionPlan;
}
