"use server";

import prisma from "@/lib/prisma";
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schemas/workflow";
import { auth } from "@clerk/nextjs/server";
import { WorkflowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";
export const deleteWorkflow = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const result = await prisma.workFlow.delete({
    where: {
      id,
      userId,
    },
  });
  if (!result) {
    throw new Error("Failed to delete workflow");
  }
  redirect(`/workflows`);
};
