"use client";
import { WorkFlow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import React, { useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { NodeComponent } from "./nodes/NodeComponent";
import { CreateWorkFlowNode } from "@/lib/workflow/CreateWorkflowNode";
import { TaskType } from "@/types/tasks";
import { AppNode } from "@/types/appNode";
import DeleteableEdge from "./edges/DeleteableEdge";
import { taskRegistry } from "@/lib/workflow/task/registry";

const nodeTypes = {
  LAUNCH_BROWSER: NodeComponent,
};

const edgeTypes = {
  default: DeleteableEdge,
};
export default function FlowEditor({ workflow }: { workflow: WorkFlow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();
  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow.definition, setNodes, setEdges, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData("application/reactflow");
      if (typeof taskType === undefined || !taskType) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = CreateWorkFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edgs) => addEdge({ ...connection, animated: true }, edgs));
      if (!connection.target || !connection.targetHandle) {
        return;
      }
      const node = nodes.find((nd) => nd.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;
      // delete nodeInputs[connection.targetHandle];
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [nodes, setEdges, updateNodeData]
  );

  const isValidConnection = useCallback((connection: Edge | Connection) => {
    //No self connection
    if (connection.source === connection.target) {
      return false;
    }
    //same task type connection
    const source = nodes.find((node) => node.id === connection.source);
    const target = nodes.find((node) => node.id === connection.target);
    if (!target || !source) {
      console.error("Invalid connection: ", connection);
      return false;
    }
    const sourceTask = taskRegistry[source.data.type];
    const targetTask = taskRegistry[target.data.type];

    const input = sourceTask.inputs.find(
      (i) => i.name === connection.sourceHandle
    );
    const output = targetTask.outputs.find(
      (o) => o.name === connection.targetHandle
    );
    if (input?.type !== output?.type) {
      console.log("Invalid connection type");
    }

    const hasCycle = (node: AppNode, visited = new Set()) => {
      if (visited.has(node.id)) return false;

      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    };

    if (target.id === connection.source) return false;
    return !hasCycle(target);

  }, [nodes]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapGrid={[40, 40]}
        snapToGrid
        // fitView  //this does get back to last viewport
        fitViewOptions={{
          padding: 1,
        }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection} //for valid mapping according to type
      >
        <Controls position="top-left" fitViewOptions={{ padding: 1 }} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}
