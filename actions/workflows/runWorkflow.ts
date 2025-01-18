"use server";

import prisma from "@/lib/prisma";
import FlowToExecutionPlan from "@/lib/workflow/executionPlan";
import { taskRegistry } from "@/lib/workflow/task/registry";
import { ExecutionPhaseStatus, ExecutionStatus, ExecutionType, WorkflowExecutionPlan, WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function runWorkFlow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const workflow = await prisma.workFlow.findUnique({
    where: { id, userId },
  });
  if (!workflow) {
    throw new Error("Workflow not found");
  }
  let executionPlan: WorkflowExecutionPlan;
  if (!flowDefinition) {
    throw new Error("Workflow definition not defined");
  }
  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("Invalid workflow");
  }

  if (!result.executionPlan) {
    throw new Error("Invalid execution plan");
  }
  executionPlan = result.executionPlan;
  console.log('executionPlan: ', executionPlan.map(executionPlan => executionPlan.nodes.map(node => node.data)));
  const execution = await prisma.workFlowExecution.create({
    data: {
      userId,
      workFlowId: id,
      status: ExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: ExecutionType.MANUAL,
      phases: {
        create: executionPlan.flatMap(phase => {
          return phase.nodes.flatMap(node => {
            return { userId, status: ExecutionPhaseStatus.CREATED, number: phase.phase, node: JSON.stringify(node), name: taskRegistry[node.data.type].label }
          })
        })
      }
    },
    select: {
      id: true,
      phases: true
    }
  })
  if(!execution) {
    throw new Error("Failed to create execution")
  }
}

revalidatePath("/workflows")