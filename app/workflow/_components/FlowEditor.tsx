"use client";
import { WorkFlow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
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
  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if (typeof taskType === undefined || !taskType) return;
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    const newNode = CreateWorkFlowNode(taskType as TaskType, position);
    setNodes((nds) => nds.concat(newNode));
  }, [screenToFlowPosition, setNodes]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((edgs) => addEdge({ ...connection, animated: true }, edgs));
    if (!connection.target || !connection.targetHandle) {
      return;
    }
    const node = nodes.find((nd) => nd.id === connection.target);
    if (!node) return;
    const nodeInputs = node.data.inputs;
    delete nodeInputs[connection.targetHandle];
    updateNodeData(node.id, { inputs: nodeInputs });
  }, [nodes, setEdges, updateNodeData]);
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
      >
        <Controls position="top-left" fitViewOptions={{ padding: 1 }} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}
