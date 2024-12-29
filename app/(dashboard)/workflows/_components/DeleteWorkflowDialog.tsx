"use client";

import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createWorkflowSchema } from "@/schemas/workflow";
import { Layers2Icon, Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";
import {AlertDialogAction,
  AlertDialog,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { deleteWorkflow } from "@/actions/workflows/deleteWorkflow";

export default function DeleteWorkflowDialog({
  open,
  setOpen,
  workflowName,
  workflowId
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}) {
  const [confirmText, setConfirmText] = useState("");
  
  const deleteMutation = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", {
        id: "deleting-workflow",
      });
      setConfirmText("");
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete workflow", { id: "deleting-workflow" });
    },
  });


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        <div className="flex flex-col py-4">
          <p>
            If you delete this workflow, it will be removed from the system.
            Enter {workflowName} to confirm.
          </p>
          <Input
            placeholder={workflowName}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            />
        </div>
        </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>setConfirmText("")}>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={confirmText !== workflowName} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={(e)=>{
                e.preventDefault();
                toast.loading("Deleting workflow...", { id: "deleting-workflow" });
                deleteMutation.mutate(workflowId);
              }}>Delete</AlertDialogAction>
            </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
