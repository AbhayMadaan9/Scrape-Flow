"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getWorkflowsForUser() {
  const { userId } = await auth();
  if (!userId) {
    return new Error("User not found");
  }
  const workflows = await prisma.workFlow.findMany({ where: { userId } });
  return workflows;
}
