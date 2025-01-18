"use client";


import { AppNodeMissingInputs } from "@/types/appNode"
import React, { createContext, Dispatch, SetStateAction, useState } from "react";
import { ReactNode } from "react";


type FLowValidationContextTye = {
    invalidInputs: AppNodeMissingInputs[];
    setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>;
    clearErrors: () => void;
}


export const FlowValidationContext = createContext<FLowValidationContextTye | null>(null)
export function FlowValidationContextProvider({
    children
}: {
    children: ReactNode
}) {
    const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>([]);

    const clearErrors = () => {
        setInvalidInputs([]);
    }
    return (
        <FlowValidationContext.Provider value={
            {
                invalidInputs,
                setInvalidInputs,
                clearErrors,
            }
        }>
            {children}
        </FlowValidationContext.Provider>
    )
}