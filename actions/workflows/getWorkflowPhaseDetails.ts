"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getWorkflowExecutionPhaseDetails(phaseId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  return await prisma.executionPhase.findUnique({
    where: { id: phaseId, execution: {userId} }
  });
}
