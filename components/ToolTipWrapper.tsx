"use client"
import React from 'react'
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from './ui/tooltip'

export default function ToolTipWrapper({children, content, side}: {children: React.ReactNode, content: string, side?: "top" | "bottom" | "left" | "right"}) {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side}>
                {content}
            </TooltipContent>
        </Tooltip>
      </TooltipProvider>        
    </div>
  )
}
