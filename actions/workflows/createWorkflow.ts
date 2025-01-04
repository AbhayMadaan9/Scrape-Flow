"use server";

import prisma from "@/lib/prisma";
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schemas/workflow";
import { auth } from "@clerk/nextjs/server";
import { WorkflowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";
import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { CreateWorkFlowNode } from "@/lib/workflow/CreateWorkflowNode";
import { TaskType } from "@/types/tasks";

export const createWorkflow = async (data: CreateWorkflowSchemaType) => {
  const { success, data: workflow } = await createWorkflowSchema.safeParseAsync(
    data
  );

  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const initialWorkflow: {
    nodes: AppNode[],
    edges: Edge[]
  } = {
    nodes: [],
    edges: [],
  }
  initialWorkflow.nodes.push(CreateWorkFlowNode(TaskType.LUNCH_BROWSER))
  const result = await prisma.workFlow.create({
    data: {
      name: workflow.name,
      description: workflow.description ?? "",
      userId,
      status: WorkflowStatus.draft,
      definition: JSON.stringify(initialWorkflow),
    },
  });
  if (!result) {
    throw new Error("Failed to create workflow");
  }
  redirect(`/workflow/editor/${result.id}`);
};
