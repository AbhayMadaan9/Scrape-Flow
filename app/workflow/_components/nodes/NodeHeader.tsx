"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { taskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/tasks";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import React from "react";

export default function NodeHeader({ taskType }: { taskType: TaskType }) {
  const task = taskRegistry[taskType];
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="flex justify-between items-center w-full">
     <div className="flex gap-2">
     <task.icon size={16} />
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
     </div>
        <div className="flex items-center gap-1">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className="gap-2 flex items-center text-sm">
            <CoinsIcon size={16} />
            Todo
          </Badge>
          {!task.isEntryPoint && ( //entry point should not be deleted and duplicated
            <>
            <Button variant={'ghost'} size={'icon'}>
              <TrashIcon size={12}/>
            </Button>
            <Button variant={'ghost'} size={'icon'}>
              <CopyIcon size={12}/>
            </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
