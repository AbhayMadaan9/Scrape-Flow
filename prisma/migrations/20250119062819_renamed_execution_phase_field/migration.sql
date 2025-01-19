/*
  Warnings:

  - You are about to drop the column `creditsCost` on the `ExecutionPhase` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExecutionPhase" (
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
    "creditsCosumed" INTEGER,
    "workFlowExecutionId" TEXT NOT NULL,
    CONSTRAINT "ExecutionPhase_workFlowExecutionId_fkey" FOREIGN KEY ("workFlowExecutionId") REFERENCES "WorkFlowExecution" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExecutionPhase" ("completedAt", "id", "inputs", "name", "node", "number", "outputs", "startedAt", "status", "userId", "workFlowExecutionId") SELECT "completedAt", "id", "inputs", "name", "node", "number", "outputs", "startedAt", "status", "userId", "workFlowExecutionId" FROM "ExecutionPhase";
DROP TABLE "ExecutionPhase";
ALTER TABLE "new_ExecutionPhase" RENAME TO "ExecutionPhase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
