"use client";

import { useState } from "react";
import { EvaToastProvider, useToast, Button } from "@/components";
import type { ToastVariant } from "@/components";

function ToastTriggers() {
  const { addToast } = useToast();

  const fire = (variant: ToastVariant, message: string) => {
    addToast({ message, variant });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="primary"
        size="sm"
        onClick={() => fire("info", "MAGI SYSTEM: Telemetry link established")}
      >
        INFO
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() => fire("success", "SYNC COMPLETE: Pilot neural bridge stable")}
      >
        SUCCESS
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() => fire("warning", "A.T. FIELD degradation detected — sector 7")}
      >
        WARNING
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() => fire("error", "ENTRY PLUG signal lost — Unit-02")}
      >
        ERROR
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() =>
          fire("critical", "PATTERN BLUE CONFIRMED — All units scramble")
        }
      >
        CRITICAL
      </Button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <EvaToastProvider>
      <ToastTriggers />
    </EvaToastProvider>
  );
}

function ToastDurationTriggers() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="primary"
        size="sm"
        onClick={() =>
          addToast({
            message: "Quick flash — 1.5s",
            variant: "info",
            duration: 1500,
          })
        }
      >
        1.5s
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() =>
          addToast({
            message: "Standard alert — 3s (default)",
            variant: "warning",
          })
        }
      >
        3s (DEFAULT)
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() =>
          addToast({
            message: "Persistent warning — holds for 8s",
            variant: "error",
            duration: 8000,
          })
        }
      >
        8s
      </Button>
    </div>
  );
}

export function ToastDurationDemo() {
  return (
    <EvaToastProvider>
      <ToastDurationTriggers />
    </EvaToastProvider>
  );
}
