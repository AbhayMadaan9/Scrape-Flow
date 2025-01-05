import { TaskType } from "@/types/tasks";
import { taskRegistry } from "./task/registry";
import { AppNode } from "@/types/appNode";

export function CreateWorkFlowNode(nodeType: TaskType, position?: { x: number; y: number }): AppNode {
    return {
        id: crypto.randomUUID(),
        type: "LAUNCH_BROWSER",
        dragHandle: ".drag-handle",
        position: position ?? { x: 0, y: 0 },
        data: {
            type: nodeType,
            inputs: {},
        },
    };
}
