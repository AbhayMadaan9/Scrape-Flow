import { getWorkflowExecutionPhases } from '@/actions/workflows/getWorkflowExecutionWithPhases';
import Topbar from '@/app/workflow/_components/Topbar/Topbar';
import { waitFor } from '@/lib/helper/waitFor';
import { auth } from '@clerk/nextjs/server';
import { Loader2Icon } from 'lucide-react';
import React, { Suspense } from 'react'
import ExecutionViewer from './_components/ExecutionViewer';

export default function page({ params }: {
    params: {
        executionId: string;
        workflowId: string;
    }
}) {
    return (
        <div className='flex flex-col items-center justify-center h-screen overflow-hidden w-full'>
            <Topbar
                workflowId={params.workflowId}
                title='Workflow run details'
                subTitle={`Run Id: ${params.executionId}`}
                hideButton
            />
            <section className='flex h-full overflow-auto w-full'>
                <Suspense fallback={
                    <div className='flex items-center justify-center w-full'>
                        <Loader2Icon className='h-10 w-10 animate-spin stroke-primary' />
                    </div>
                }>
                    <ExecutionViewWrapper executionId={params.executionId} />
                </Suspense>
            </section>
        </div>
    )
}

async function ExecutionViewWrapper({ executionId }: { executionId: string }) {
    const { userId } = await auth();
    if (!userId) {
        return <div>Unauthenticated</div>
    }

    const workflowExecution = await getWorkflowExecutionPhases(executionId);
    if (!workflowExecution) {
        return <div>Execution not found</div>
    }
    return (
       <ExecutionViewer initialData={workflowExecution}/>
    )
}
