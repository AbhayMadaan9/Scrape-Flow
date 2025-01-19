"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getWorkflowExecutionPhases(executionId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  return await prisma.workFlowExecution.findUnique({
    where: { userId, id: executionId }, include: {
      phases: {
        orderBy: { number: 'asc' }
      }
    }
  });
}
