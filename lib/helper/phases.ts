import { ExecutionPhase } from "@prisma/client";

type Phase = Pick<ExecutionPhase, "creditsCosumed">
export function getPhasesTotalCost(phases: Phase[]) {
return phases.reduceRight((acc, currentPhase)=> acc + (currentPhase.creditsCosumed ?? 0), 0) 
}

