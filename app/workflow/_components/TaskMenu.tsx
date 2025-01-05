"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { taskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/tasks";
import React from "react";

export default function TaskMenu() {
  return (
    <aside className="w-[340px] min-w-[340px] border-r-2 border-separate p-2 px-4 overflow-auto">
      <Accordion type="multiple" className="w-full" defaultValue={["extraction"]}>
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = taskRegistry[taskType];
  const onDragStart = (e: React.DragEvent, type: TaskType)=>{
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  }
  return (
    <Button
      variant={"secondary"}
      className="flex justify-start gap-3 items-center border w-full"
    draggable
    onDragStart={(e)=>onDragStart(e, taskType)}
    >
      <task.icon size={20} />
      {task.label}
    </Button>
  );
}
