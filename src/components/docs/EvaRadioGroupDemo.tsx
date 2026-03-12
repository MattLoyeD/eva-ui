"use client";
import { useState } from "react";
import { EvaRadioGroup } from "@/components";

export function RadioGroupBasicDemo() {
  const [value, setValue] = useState("alpha");
  return (
    <EvaRadioGroup
      label="PRIORITY LEVEL"
      options={[
        { value: "alpha", label: "ALPHA" },
        { value: "beta", label: "BETA" },
        { value: "omega", label: "OMEGA" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}

export function RadioGroupHorizontalDemo() {
  const [value, setValue] = useState("online");
  return (
    <EvaRadioGroup
      label="STATUS"
      direction="horizontal"
      options={[
        { value: "online", label: "ONLINE" },
        { value: "standby", label: "STANDBY" },
        { value: "offline", label: "OFFLINE" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}

export function RadioGroupGreenDemo() {
  const [value, setValue] = useState("low");
  return (
    <EvaRadioGroup
      label="THREAT LEVEL"
      color="green"
      options={[
        { value: "low", label: "LOW" },
        { value: "medium", label: "MEDIUM" },
        { value: "high", label: "HIGH" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}

export function RadioGroupCyanDemo() {
  const [value, setValue] = useState("unit01");
  return (
    <EvaRadioGroup
      label="ASSIGNED UNIT"
      color="cyan"
      options={[
        { value: "unit00", label: "EVA-00" },
        { value: "unit01", label: "EVA-01" },
        { value: "unit02", label: "EVA-02" },
        { value: "unit03", label: "EVA-03", disabled: true },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}
