-- CreateTable
CREATE TABLE "WorkFlowExecution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workFlowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    CONSTRAINT "WorkFlowExecution_workFlowId_fkey" FOREIGN KEY ("workFlowId") REFERENCES "WorkFlow" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExecutionPhase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "node" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "inputs" TEXT,
    "outputs" TEXT,
    "creditsCost" INTEGER,
    "workFlowExecutionId" TEXT NOT NULL,
    CONSTRAINT "ExecutionPhase_workFlowExecutionId_fkey" FOREIGN KEY ("workFlowExecutionId") REFERENCES "WorkFlowExecution" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
