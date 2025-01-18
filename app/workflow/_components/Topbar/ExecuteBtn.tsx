"use client";
import { runWorkFlow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const mutation = useMutation({
    mutationFn: runWorkFlow,
    onSuccess() {
      toast.success("Workflow executed successfully", {id: "flow-execution"});
    },
    onError() {
      toast.error("Workflow execution failed", {id: "flow-execution"});
    },
  })
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
          const plan = generate();
          if(plan){
            mutation.mutate({ id: workflowId, flowDefinition: JSON.stringify(toObject()) });
          }
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}
