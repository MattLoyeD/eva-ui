"use client";

import { useState } from "react";
import { ClassifiedOverlay } from "@/components";
import { Button } from "@/components";

export function ClassifiedOverlayDemo() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="space-y-3">
      <ClassifiedOverlay text="TOP SECRET" isUnlocked={unlocked} className="min-h-[200px]">
        <div className="p-6 text-eva-green font-mono text-sm space-y-1">
          <div>CLASSIFIED DATA — EYES ONLY</div>
          <div>CLEARANCE: LEVEL 7</div>
          <div>DEAD SEA SCROLLS LOCATION: [REDACTED]</div>
          <div>HUMAN INSTRUMENTALITY PROJECT: [REDACTED]</div>
          <div className="pt-2 text-eva-cyan text-[10px]">
            DECRYPTED AT {new Date().toISOString().split("T")[0]}
          </div>
        </div>
      </ClassifiedOverlay>
      <Button
        variant={unlocked ? "ghost" : "danger"}
        size="sm"
        fullWidth
        onClick={() => setUnlocked((v) => !v)}
      >
        {unlocked ? "RE-CLASSIFY" : "OVERRIDE CLEARANCE — DECRYPT"}
      </Button>
    </div>
  );
}
