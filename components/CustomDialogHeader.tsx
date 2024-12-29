"use client"

import { DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { LucideIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface Props {
    icon?: LucideIcon;
    title?: string;
    subtitle?: string;
    iconClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}

export default function CustomDialogHeader({
    icon: Icon,
    title, 
    subtitle, 
    iconClassName, 
    titleClassName, 
    subtitleClassName
}: Props) {
    return (
        <DialogHeader className="py-6">
            <DialogTitle asChild className={cn(titleClassName)}>
                <div className="flex flex-col items-center gap-2 mb-2">
                   {Icon && <Icon className={cn("stroke-primary", iconClassName)} />}
                   {
                    title && <p className={cn("text-xl text-primary", titleClassName)}>{title}</p>
                   }
                   {
                    subtitle && <p className={cn("text-sm text-muted-foreground", subtitleClassName)}>{subtitle}</p>
                   }
                </div>
            </DialogTitle>
            <Separator />
        </DialogHeader>
    )
}