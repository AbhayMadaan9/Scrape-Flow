import { getWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/waitFor";
import { AlertCircle, Inbox, Workflow } from "lucide-react";
import React, { Suspense } from "react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import WorkflowCard from "./_components/WorkflowCard";

export default function page() {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">
            Create and manage your workflows here
          </p>
        </div>
        <CreateWorkflowDialog />
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkFlowSkeleton />}>
          <UserWorkFlows />
        </Suspense>
      </div>
    </div>
  );
}

function UserWorkFlowSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    </div>
  );
}

async function UserWorkFlows() {
  const workflows = await getWorkflowsForUser();
  if (workflows instanceof Error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{workflows.message}</AlertDescription>
        <AlertDescription>Please try again later</AlertDescription>
      </Alert>
    );
  }
  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full justify-center items-center">
        <div className=" rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <Inbox size={20} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflows created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }
  return <div className="grid grid-cols-1 gap-4">
    {workflows.map((workflow) => (
      <WorkflowCard key={workflow.id} workflow={workflow} />
    ))}
  </div>
}
