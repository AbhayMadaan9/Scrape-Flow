"use client";

import ToolTipWrapper from "@/components/ToolTipWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow";
import { WorkFlow } from "@prisma/client";
import {
  EditIcon,
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";


const statusColor: Record<WorkflowStatus, string> = {
  [WorkflowStatus.draft]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.published]: "bg-primary",
  [WorkflowStatus.archived]: "bg-gray-500 text-gray-800",
};


export default function WorkflowCard({ workflow }: { workflow: WorkFlow }) {
  const isDraft = workflow.status === WorkflowStatus.draft;
  return (
    <div>
      <Card className="border border-separate shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 flex items-center justify-between h-[100px] w-full">
          <div className="flex items-center justify-center gap-2">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                statusColor[workflow.status as WorkflowStatus]
              )}
            >
              {isDraft ? (
                <FileTextIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-muted-foreground flex items-center">
                <Link
                  href={`/workflow/editor/${workflow.id}`}
                  className="flex items-center hover:underline"
                >
                  {workflow.name}
                </Link>
                {isDraft && (
                  <span className="ml-2 px-2 py-0.5  text-xs font-medium bg-yellow-400 text-yellow-800 rounded-full">
                    Draft
                  </span>
                )}
              </h3>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href={`/workflow/editor/${workflow.id}`}
              className={cn(
                "flex items-center gap-2",
                buttonVariants({ variant: "outline", size: "sm" })
              )}
            >
              <EditIcon className="w-4 h-4" />
            </Link>
            <WorkflowActions workflow={workflow} />
          </div>
        </div>
      </Card>
    </div>
  );
}
const WorkflowActions = ({workflow}: {workflow: WorkFlow}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ToolTipWrapper content="More Actions">
            <div className="flex items-center justify-center w-full h-full">
              <MoreVerticalIcon className="w-4 h-4" />
            </div>
          </ToolTipWrapper>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive flex items-center justify-start gap-2" onClick={() => setShowDeleteDialog(true)}>
        <TrashIcon size={16} />
        Delete
      </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <DeleteWorkflowDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowName={workflow.name} workflowId={workflow.id} />
    </>
  );
};
