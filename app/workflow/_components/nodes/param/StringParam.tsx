import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import React, { useEffect, useId, useState, useCallback } from "react";

export default function StringParam({
  param,
  value,
  updateNodeParamValue,
  disabled
}: ParamProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    updateNodeParamValue(newValue);
  }, [updateNodeParamValue]);

  let Componenent: any =Input;
  if(param.variant === "textarea"){
    Componenent = Textarea;
  }
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-sm flex">
        {param.name}
        {param.required && <span className="text-red-400 px-2">*</span>}
      </Label>
      <Componenent
        id={id}
        className="text-sm"
        value={internalValue}
        placeholder="Enter value here..."
        onChange={handleChange}
        disabled={disabled}
      />
      {param.helperText && (
        <p className="text-muted-foreground text-xs px-2">{param.helperText}</p>
      )}
    </div>
  );
}

