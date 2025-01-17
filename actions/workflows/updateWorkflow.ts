"use server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateWorkFlow({
  id,
  definition,
}: {
  id: string;
  definition: string;
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
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Cannot update a DRAFT workflow");
  }
  await prisma.workFlow.update({
    data: { definition },
    where: { id, userId },
  });
  return workflow;
}

revalidatePath("/workflows")