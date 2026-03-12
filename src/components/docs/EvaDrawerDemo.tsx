"use client";
import { useState } from "react";
import { EvaDrawer, Button } from "@/components";

export function DrawerBasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>OPEN DRAWER</Button>
      <EvaDrawer open={open} onClose={() => setOpen(false)} title="SYSTEM PANEL">
        <div className="text-sm font-mono text-eva-white/80 space-y-2">
          <div>Unit: EVA-01</div>
          <div>Status: ACTIVE</div>
          <div>Sync Rate: 89.2%</div>
        </div>
      </EvaDrawer>
    </div>
  );
}

export function DrawerLeftDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="terminal" onClick={() => setOpen(true)}>OPEN LEFT</Button>
      <EvaDrawer open={open} onClose={() => setOpen(false)} title="NAVIGATION" side="left" color="green">
        <div className="text-sm font-mono text-eva-green/80 space-y-2">
          <div>// OPERATIONS</div>
          <div>// INTELLIGENCE</div>
          <div>// MAGI SYSTEM</div>
        </div>
      </EvaDrawer>
    </div>
  );
}
