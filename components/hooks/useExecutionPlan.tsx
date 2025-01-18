import { useReactFlow } from "@xyflow/react";
import React, { useCallback } from "react";
import FlowToExecutionPlan, { FlowToExecutionPlanValidationError } from "../../lib/workflow/executionPlan";
import { AppNode } from "@/types/appNode";
import useFlowValidation from "./useFlowValidation";
import { toast } from "sonner";



export default function useExecutionPlan() {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();
  const handleError = useCallback((error: any) => {
    switch (error.type) {
      case FlowToExecutionPlanValidationError.INVALID_INPUTS: {
        setInvalidInputs(error.invalidElements);
        toast.error("Not all input values are set");
        break;
      }

      case FlowToExecutionPlanValidationError.NO_ENTRY_POINT: {
        toast.error("No entry point found");
        break;
      }

      default: {
        toast.error("Something went wrong");
        break;
      }
    }
  }, [setInvalidInputs])
  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(nodes as AppNode[], edges);
    if (error) {
      console.log('error: ', error);
      handleError(error);
      return null;
    }
    clearErrors();
    return executionPlan;

  }, [toObject, handleError, clearErrors]);
  return generateExecutionPlan;
}


