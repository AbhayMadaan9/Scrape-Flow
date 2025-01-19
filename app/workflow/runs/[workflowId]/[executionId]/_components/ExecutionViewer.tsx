"use client"
import { getWorkflowExecutionPhases } from '@/actions/workflows/getWorkflowExecutionWithPhases'
import { ExecutionStatus, WorkflowStatus } from '@/types/workflow'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2Icon, LucideIcon, WorkflowIcon } from 'lucide-react'
import React, { ReactNode, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { datesToDurationString } from '@/lib/helper/dates'
import { getPhasesTotalCost } from '@/lib/helper/phases'
import { getWorkflowExecutionPhaseDetails } from '@/actions/workflows/getWorkflowPhaseDetails'

type ExecutionData = Awaited<ReturnType<typeof getWorkflowExecutionPhases>>
export default function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {
    const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
    const query = useQuery({
        queryKey: ["execution", initialData?.id],
        initialData,
        queryFn: () => getWorkflowExecutionPhases(initialData!.id),
        refetchInterval: (q) => q.state.data?.status === ExecutionStatus.RUNNING ? 1000 : false,
    });

    const phaseDetails = useQuery({
        queryKey: ["phaseDetails", selectedPhase],
        enabled: selectedPhase !== null,
        queryFn: () => getWorkflowExecutionPhaseDetails(selectedPhase!),
        
    });
    const isRunning = query.data?.status === ExecutionStatus.RUNNING 
    const duration = datesToDurationString(query.data?.startedAt, query.data?.completedAt);

    const creditsConsumed = getPhasesTotalCost(query.data?.phases ?? [])
    return (
        <div className='flex w-full h-full'>
            <aside className='w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden'>
                <div className='py-4 px-2'>
                    <ExecutionLabel
                        icon={CircleDashedIcon}
                        label={"Status"}
                        value=
                        {
                            <span className='lowercase'>

                                {query.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt), { addSuffix: true }) : "-"}
                            </span>
                        }
                    />
                    <ExecutionLabel
                        icon={CalendarIcon}
                        label={"Started At"}
                        value={

                            <span className='lowercase'>

                                {query.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt), { addSuffix: true }) : "-"}
                            </span>
                        }
                    />
                    <ExecutionLabel
                        icon={ClockIcon}
                        label={"Duration"}
                        value={
                            <span className='lowercase'>
                                {duration ? duration : (
                                    <Loader2Icon className='animate-spin' size={20} />
                                )}
                            </span>
                        }
                    />
                    <ExecutionLabel
                        icon={CoinsIcon}
                        label={"Credits consumed"}
                        value={

                            <span className='lowercase'>

                                {creditsConsumed}
                            </span>
                        }
                    />
                    <Separator />
                    <div className='flex items-center gap-2 px-4  justify-center'>
                        <div className='flex items-center gap-2 text-muted-foreground'>
                            <WorkflowIcon size={20} className='stroke-muted-foreground/80' />
                            <span className='font-sans'>Phases</span>
                        </div>
                    </div>
                    <Separator />
                    <div className='overflow-auto h-full px-2 py-2'>
                        {query.data?.phases.map((phase, index) => (
                            <Button key={index}
                                className='flex items-center justify-start gap-2 w-full' variant={selectedPhase === phase.id ?'secondary': 'ghost'}
                                onClick={()=>{
                                    if(isRunning) return;
                                    setSelectedPhase(phase.id)
                                }}
                                >
                                <div className='flex items-center gap-2'>

                                    <Badge variant={'outline'}>
                                        {/* {phase.number} */}
                                        {index + 1}
                                    </Badge>
                                    <p className='font-semibold'>{phase.name}</p>
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                    {phase.status}
                                </p>
                            </Button>
                        ))}
                    </div>
                </div>
            </aside>
            <div className='flex w-full h-full'>
                <pre>
                    {JSON.stringify(phaseDetails, null, 4)}
                </pre>
            </div>
        </div>
    )
}



function ExecutionLabel({ icon, label, value }: { icon: LucideIcon, label: ReactNode, value: ReactNode }) {
    const Icon = icon;
    return (
        <div className='flex items-center justify-between py-2 px-4 text-sm'>
            <div className='text-muted-foreground flex items-center gap-2'>
                <Icon size={20} className='stroke-muted-foreground/80' />
                <span>{label}</span>
            </div>
            <div className='font-semibold capitalize flex gap-2 items-center'>
                {value}
            </div>
        </div>
    )
}

