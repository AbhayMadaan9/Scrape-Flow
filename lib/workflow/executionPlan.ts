import { taskRegistry } from "@/lib/workflow/task/registry";
import { AppNode, AppNodeMissingInputs } from "@/types/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";


export enum FlowToExecutionPlanValidationError {
  "NO_ENTRY_POINT",
  "INVALID_INPUTS"
}
type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
  error?: {
    type: FlowToExecutionPlanValidationError;
    invalidElements?: AppNodeMissingInputs[];
  }
};
export default function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  const entryPoint = nodes.find(
    (node) => taskRegistry[node.data.type]?.isEntryPoint
  );
  if (!entryPoint) {
   return {
    error: {
      type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
    },
   }
  }

  const inputsWithErrors: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const invalidInputs = getInvalidInputs(entryPoint, edges, planned);
  console.log('invalidInputs: ', invalidInputs);

  if(inputsWithErrors.length > 0) {
    inputsWithErrors.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs
    })
   }
    const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];
  planned.add(entryPoint.id);
  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = {
      phase,
      nodes: [],
    };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue;
      }
      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        console.log('incomers: ', incomers);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          //since every incoming edge from the node are already visited/executed it means current node has invalid inputs and whole workflow is invalid
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          })
        } else {
          //skip for now
          continue;
        }
      }
      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }
  console.log('inputsWithErrors: ', inputsWithErrors);
  if(inputsWithErrors.length > 0){
    return {
      error: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputsWithErrors,
      },
    }
  }
  return { executionPlan };
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = [];
  const inputs = taskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      continue;
    }

    const incomingEdges = edges.filter((edges) => edges.target === node.id);

    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisistedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisistedOutput) {
      continue;
    } else if (!input.required) {
      //if input is not required but htere is an output linked to it then we ned to be sure that the output is already planne
      if (!inputLinkedToOutput) {
        continue;
      }
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue;
      }
    }
    invalidInputs.push(input.name);
  }
  return invalidInputs;
}
