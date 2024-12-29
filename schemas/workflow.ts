import { z } from "zod";

export const createWorkflowSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional()
})

export type CreateWorkflowSchemaType = z.infer<typeof createWorkflowSchema>
